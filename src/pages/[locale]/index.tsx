import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import Seo from '@/components/theme/Seo'
import SolanaWalletRow from '@/components/pages/index/SolanaWalletRow'

const getStaticProps = makeStaticProps(['common', 'home'])
export { getStaticPaths, getStaticProps }

export default function Home() {
  const { t } = useTranslation()
  return (
    <>
      <Seo
        pathname="/"
        title={t('home:title')}
        description={t('home:description')}
      />
      <SolanaWalletRow />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
