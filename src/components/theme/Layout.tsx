import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import { makeTheme } from '@/constants/theme'
import { AppPropsWithLayout } from '@/pages/_app'
import { useTranslation } from 'next-i18next'
import { useRecoilValue } from 'recoil'
import { colorModeState } from '@/store/colorMode'
import { useMemo } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { enUS as dateEn, ja as dateJa } from 'date-fns/locale'
import { SnackbarProvider } from 'notistack'
import NextNprogress from 'nextjs-progressbar'
import SolanaWalletProvider from '@/components/wallet/SolanaWalletProvider'
import AgreeToPolicy from '@/components/notifier/AgreeToPolicy'

export default function Layout({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { i18n } = useTranslation()
  const colorMode = useRecoilValue(colorModeState)
  const isEnglish = useMemo(() => i18n.language === 'en', [i18n])
  const theme = makeTheme(isEnglish, colorMode)
  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={isEnglish ? dateEn : dateJa}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <SolanaWalletProvider>
              <NextNprogress
                color={theme.palette.secondary.main}
                startPosition={0.3}
                stopDelayMs={200}
                height={1}
              />
              {getLayout(<Component {...pageProps} />)}
            </SolanaWalletProvider>
          </SnackbarProvider>
          <AgreeToPolicy />
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}
