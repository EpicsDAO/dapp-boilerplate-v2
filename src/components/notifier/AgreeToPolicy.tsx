import { useCallback, useState, useEffect } from 'react'
import { Snackbar, Button, IconButton } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { initializeApp, FirebaseApp, getApp, getApps } from 'firebase/app'
import { Analytics, logEvent, getAnalytics } from 'firebase/analytics'
import { useTranslation } from 'next-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { policyAgreedState } from '@/store/policy'
import { colorModeState } from '@/store/colorMode'
import { EpicsGrey } from '@/constants/colors'
import useI18nRouter from '@/hooks/useI18nRouter'

import firebaseConfig from '@/constants/firebaseConfig'

export default function AgreeToPolicy() {
  const [policyAgreed, setPolicyAgreed] = useRecoilState(policyAgreedState)
  const colorMode = useRecoilValue(colorModeState)
  const [open, setOpen] = useState(!policyAgreed)
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | undefined>(
    undefined
  )
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined)

  const router = useRouter()
  const { t } = useTranslation()
  const { routerPush } = useI18nRouter()

  const handleAgree = useCallback(() => {
    setOpen(false)
    setPolicyAgreed(true)
  }, [setOpen, setPolicyAgreed])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (policyAgreed) {
      if (!firebaseApp) {
        setFirebaseApp(
          !getApps().length ? initializeApp(firebaseConfig) : getApp()
        )
        if (
          typeof window !== 'undefined' &&
          process.env.NODE_ENV !== 'development'
        ) {
          setAnalytics(getAnalytics(firebaseApp))
        }
      }
      if (firebaseApp && analytics) {
        logEvent(analytics, 'page_view', {
          page_title: document.title,
          page_location: document.URL,
          page_path: router.asPath,
        })
      }
    } else {
      setOpen(true)
    }
  }, [setOpen, policyAgreed, router.asPath, firebaseApp, analytics])

  const action = (
    <>
      <Button
        onClick={() => routerPush('/legal/privacy-policy')}
        color="inherit"
        variant="text"
        sx={{
          color:
            colorMode === 'light' ? EpicsGrey.contrastText : EpicsGrey[300],
        }}
      >
        {t('common:detail')}
      </Button>

      <Button
        variant="outlined"
        color="inherit"
        onClick={() => {
          handleAgree()
        }}
      >
        {t('common:agree')}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          handleClose()
        }}
      >
        <CloseRounded fontSize="small" />
      </IconButton>
    </>
  )
  return (
    <>
      <Snackbar
        open={open}
        action={action}
        message={t('common:cookiePolicy')}
      />
    </>
  )
}
