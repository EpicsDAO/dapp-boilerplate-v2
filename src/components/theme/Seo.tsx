import { useMemo } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

type Props = {
  title: string
  pathname: string
  description: string
  img?: string
}

export default function Seo({ pathname, title, description, img }: Props) {
  const { i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <Head>
        {isJapanese ? (
          <title>{`${title} | ${process.env.sitenameJA}`}</title>
        ) : (
          <title>{`${title} | ${process.env.sitenameEN}`}</title>
        )}
        <meta name="description" content={description} />
        <meta property="twitter:description" content={description} />

        {isJapanese ? (
          <meta
            property="og:title"
            content={`${title} | ${process.env.sitenameJA}`}
          />
        ) : (
          <meta
            property="og:title"
            content={`${title} | ${process.env.sitenameEN}`}
          />
        )}
        <meta
          property="og:url"
          content={`https://${process.env.domain}/${pathname}`}
        />
        <meta property="og:description" content={description} />
        {isJapanese ? (
          <meta
            property="twitter:title"
            content={`${title} | ${process.env.sitenameJA}`}
          />
        ) : (
          <meta
            property="twitter:title"
            content={`${title} | ${process.env.sitenameEN}`}
          />
        )}

        {img ? (
          <>
            <meta
              property="og:image"
              content={`https://${process.env.domain}${img}`}
            />
            <meta
              property="twitter:image"
              content={`https://${process.env.domain}${img}`}
            />
          </>
        ) : (
          <>
            <meta
              property="og:image"
              content={`https://${process.env.domain}/ogp.jpg`}
            />
            <meta
              property="twitter:image"
              content={`https://${process.env.domain}/ogp.jpg`}
            />
          </>
        )}
      </Head>
    </>
  )
}
