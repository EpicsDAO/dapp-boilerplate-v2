import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import { join, dirname } from 'path'
import matter from 'gray-matter'
import globby from 'globby'
import { TranslationServiceClient } from '@google-cloud/translate'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remark2Rehype from 'remark-rehype'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import remarkSlug from 'remark-slug'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import remarkExternalLinks from 'remark-external-links'
import { visit } from 'unist-util-visit'
import { h } from 'hastscript'
import rehypeParse from 'rehype-parse'
import rehype2Remark from 'rehype-remark'
import remarkStringify from 'remark-stringify'

const projectId = 'elsoul-nl'
const location = 'global'
const translationClient = new TranslationServiceClient({ projectId })

const froms = ['posts/legal/ja/**/*.md']
const targets = ['posts/legal/en/**/*.md']

async function translateMarkdown() {
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

  const originalContents = pagePaths.map((pagePath) =>
    getOriginalContent(pagePath)
  )

  for await (const originalContent of originalContents) {
    try {
      const html = await unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(() => {
          return (tree) => {
            visit(tree, (node) => {
              if (
                node.type === 'textDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'containerDirective'
              ) {
                const data = node.data || (node.data = {})
                const hast = h(node.name, node.attributes)

                data.hName = hast.tagName
                data.hProperties = hast.properties
              }
              if (node.type === 'link') {
                if (!node.url.includes('http')) {
                  node.url = node.url.replace('/ja/', '/')
                }
              }
            })
          }
        })
        .use(remarkGfm)
        .use(remarkSlug)
        .use(remarkExternalLinks, {
          target: '_blank',
          rel: ['noopener noreferrer'],
        })
        .use(remark2Rehype)
        .use(rehypeCodeTitles)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(originalContent.content)

      const title = await googleTranslate(originalContent.title)
      const description = await googleTranslate(originalContent.description)
      const translatedContent = await googleTranslate(html)
      const content = await unified()
        .use(rehypeParse)
        .use(rehype2Remark)
        .use(remarkGfm)
        .use(remarkStringify)
        .process(translatedContent)
      const pagePath = originalContent.pagePath.replace('ja', 'en')

      const pageContent = `---
id: ${originalContent.id}
title: ${title}
description: ${description}
---

${content.value}
`
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

function getOriginalContent(pagePath) {
  const fullPath = join(process.cwd(), pagePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    content: content,
    pagePath,
  }
}

async function googleTranslate(text) {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/html',
    sourceLanguageCode: 'ja',
    targetLanguageCode: 'en',
  }
  const [response] = await translationClient.translateText(request)
  return response.translations[0].translatedText
}

translateMarkdown()
