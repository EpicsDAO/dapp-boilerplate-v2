import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Layout from '@/components/theme/Layout'
import { RecoilRoot } from 'recoil'
import '@/assets/style/Article.css'
import '@/assets/style/WalletAdapter.css'
import Head from 'next/head'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
        {/* @ts-ignore */}
        {pageProps.seoData?.map((seo, index) => (
          <meta {...seo} key={`metaSeo${index}`} />
        ))}
      </Head>
      <RecoilRoot>
        <Layout Component={Component} pageProps={pageProps} router={router} />
      </RecoilRoot>
    </>
  )
}

export default appWithTranslation(MyApp)
