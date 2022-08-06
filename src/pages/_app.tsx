import type { ReactElement, ReactNode } from 'react'
// import { useCallback, useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Layout from '@/components/theme/Layout'
import { RecoilRoot } from 'recoil'
import '@/assets/style/Article.css'
import '@/assets/style/WalletAdapter.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppProps) {
  // const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), [])

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     resetWindowScrollPosition()
  //   }
  // }, [resetWindowScrollPosition])
  return (
    <RecoilRoot>
      <Layout Component={Component} pageProps={pageProps} router={router} />
    </RecoilRoot>
  )
}

export default appWithTranslation(MyApp)
