import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import SolanaWalletRow from '@/components/pages/index/SolanaWalletRow'

const seo = {
  pathname: '/',
  title: {
    ja: 'ホーム',
    en: 'Home',
  },
  description: {
    ja: 'Solana チェーン上にdAppを構築するためのボイラープレートです。Next.js(React)とTypeScriptを使用しています。',
    en: `Boilerplate for building dApps on Solana chains. It's using Next.js (React) and TypeScript.`,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'home'], seo)
export { getStaticPaths, getStaticProps }

export default function Home() {
  const { t } = useTranslation()
  return (
    <>
      <div style={{ minHeight: '60vh' }}>
        <SolanaWalletRow />
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
