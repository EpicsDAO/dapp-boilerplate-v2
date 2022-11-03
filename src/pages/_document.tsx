import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const { locale } = this.props.__NEXT_DATA__.query
    return (
      <Html lang={locale as string}>
        <Head>
          <meta name="format-detection" content="telephone=no" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          {locale === 'ja' ? (
            <meta name="keywords" content={process.env.keywordsJA} />
          ) : (
            <meta name="keywords" content={process.env.keywordsEN} />
          )}

          <meta property="og:type" content="website" />
          {locale === 'ja' ? (
            <meta property="og:site_name" content={process.env.sitenameJA} />
          ) : (
            <meta property="og:site_name" content={process.env.sitenameEN} />
          )}
          <meta
            property="og:locale"
            content={locale === 'ja' ? 'ja_JP' : 'en_US'}
          />
          <meta name="twitter:card" content="summary_large_image" />

          <meta name="twitter:creator" content={process.env.twitterAccount} />
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
