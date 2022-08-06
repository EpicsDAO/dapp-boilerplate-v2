import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import { join, dirname } from 'path'
import globby from 'globby'
import { TranslationServiceClient } from '@google-cloud/translate'

const projectId = 'elsoul-nl'
const location = 'global'
const translationClient = new TranslationServiceClient({ projectId })

const froms = ['locales/ja/**/*.json']
const targets = ['locales/en/**/*.json']

class JsonTranslate {
  constructor() {
    this.originalContents = []
    this.translated = {}
  }

  async getOriginalContents() {
    const fromPaths = await globby(froms)
    const targetPaths = await globby(targets)
    const pagePaths = fromPaths.filter((from) => {
      const enPath = from.replace('ja', 'en')
      return !targetPaths.includes(enPath)
    })

    const targetDirsDup = pagePaths.map((path) => {
      const enPath = path.replace('ja', 'en')
      return dirname(enPath)
    })
    const targetDirs = new Set(targetDirsDup)

    targetDirs.forEach((dir) => {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) console.log(err)
      })
    })

    this.originalContents = pagePaths.map((pagePath) =>
      getOriginalContent(pagePath)
    )
  }

  async translateContents() {
    for await (const originalContent of this.originalContents) {
      try {
        this.translated = {}
        const { fileData } = originalContent
        await this.translateObject(fileData)
        console.log(this.translated)

        const pagePath = originalContent.pagePath.replace('ja', 'en')
        const pageContent = JSON.stringify(this.translated)
        fs.writeFileSync(pagePath, pageContent)
        console.log(`wrote ${pagePath}`)
      } catch (err) {
        console.log(`===`)
        console.log(`Error occured for ${originalContent.pagePath}`)
        console.error(err)
        console.log(`===`)
      }
    }
  }

  async translateObject(fileData, keys = []) {
    const contentsArray = []
    for (const key in fileData) {
      contentsArray.push([key, fileData[key]])
    }
    for await (const keyValue of contentsArray) {
      if (typeof keyValue[1] != 'string') {
        await this.translateObject(keyValue[1], [...keys, keyValue[0]])
      } else {
        const translatedValue = await googleTranslate(keyValue[1])
        if (keys.length == 0) {
          this.translated[keyValue[0]] = translatedValue
        } else if (keys.length == 1) {
          if (this.translated[keys[0]] == undefined) {
            this.translated[keys[0]] = {}
          }
          this.translated[keys[0]][keyValue[0]] = translatedValue
        } else if (keys.length == 2) {
          if (this.translated[keys[0]] == undefined) {
            this.translated[keys[0]] = {}
          }
          if (this.translated[keys[0]][keys[1]] == undefined) {
            this.translated[keys[0]][keys[1]] = {}
          }
          this.translated[keys[0]][keys[1]][keyValue[0]] = translatedValue
        } else if (keys.length == 3) {
          if (this.translated[keys[0]] == undefined) {
            this.translated[keys[0]] = {}
          }
          if (this.translated[keys[0]][keys[1]] == undefined) {
            this.translated[keys[0]][keys[1]] = {}
          }
          if (this.translated[keys[0]][keys[1]][keys[2]] == undefined) {
            this.translated[keys[0]][keys[1]][keys[2]] = {}
          }
          this.translated[keys[0]][keys[1]][keys[2]][keyValue[0]] =
            translatedValue
        } else if (keys.length == 4) {
          if (this.translated[keys[0]] == undefined) {
            this.translated[keys[0]] = {}
          }
          if (this.translated[keys[0]][keys[1]] == undefined) {
            this.translated[keys[0]][keys[1]] = {}
          }
          if (this.translated[keys[0]][keys[1]][keys[2]] == undefined) {
            this.translated[keys[0]][keys[1]][keys[2]] = {}
          }
          if (
            this.translated[keys[0]][keys[1]][keys[2]][keys[3]] == undefined
          ) {
            this.translated[keys[0]][keys[1]][keys[2]][keys[3]] = {}
          }
          this.translated[keys[0]][keys[1]][keys[2]][keys[3]][keyValue[0]] =
            translatedValue
        } else {
          console.err('Please fix to nest of 4 steps or less')
        }
      }
    }
  }
}

async function translateJson() {
  const jsonTranslate = new JsonTranslate()
  await jsonTranslate.getOriginalContents()
  await jsonTranslate.translateContents()
}

function getOriginalContent(pagePath) {
  const fullPath = join(process.cwd(), pagePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const fileData = JSON.parse(fileContents)
  return { pagePath, fileData }
}

async function googleTranslate(text) {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/plain',
    sourceLanguageCode: 'ja',
    targetLanguageCode: 'en',
  }
  const [response] = await translationClient.translateText(request)
  return response.translations[0].translatedText
}

translateJson()
