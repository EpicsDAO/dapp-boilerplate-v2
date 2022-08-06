import type { Dispatch, SetStateAction } from 'react'
import { Toolbar, useMediaQuery, Box, IconButton, Button } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MenuRounded } from '@mui/icons-material'
import { useRecoilValue } from 'recoil'
import { colorModeState } from '@/store/colorMode'
import { useTheme } from '@mui/material/styles'
import useI18nRouter from '@/hooks/useI18nRouter'
import logoHorizontal from '@/assets/img/logo/Epics-logo-horizontal.svg'
import logoHorizontalWhite from '@/assets/img/logo/Epics-logo-horizontal-white.svg'
import LanguageChanger from '@/components/theme/LanguageChanger'
import ColorModeChanger from '@/components/theme/ColorModeChanger'
import defaultHeaderNavs from '@/components/nav/default/defaultHeaderNavs'
import { useTranslation } from 'next-i18next'
import LinkComponent from '@/components/routing/Link'
import logo from '@/assets/img/logo/Epics-logo.svg'
import logoWhite from '@/assets/img/logo/Epics-logo-white.svg'

type Props = {
  setMobileMenuVisible: Dispatch<SetStateAction<boolean>>
}

export default function DefaultHeader({ setMobileMenuVisible }: Props) {
  const { router, routerPush } = useI18nRouter()
  const colorMode = useRecoilValue(colorModeState)
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDownDisplay = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()

  return (
    <>
      <Toolbar>
        {mdDownDisplay && (
          <Box mr={1}>
            <IconButton
              edge="start"
              onClick={() => setMobileMenuVisible(true)}
              aria-label="Menu"
            >
              <MenuRounded aria-label="Menu" />
            </IconButton>
          </Box>
        )}
        {mdDownDisplay && (
          <Box sx={{ marginTop: '4px' }}>
            {xsDisplay ? (
              <LinkComponent href="/">
                <LazyLoadImage
                  width={40}
                  height={40}
                  src={colorMode === 'light' ? logo.src : logoWhite.src}
                  alt="Logo"
                  effect="opacity"
                />
              </LinkComponent>
            ) : (
              <LinkComponent href="/">
                <LazyLoadImage
                  width={168}
                  height={48}
                  src={
                    colorMode === 'light'
                      ? logoHorizontal.src
                      : logoHorizontalWhite.src
                  }
                  alt="Logo"
                  effect="opacity"
                />
              </LinkComponent>
            )}
          </Box>
        )}

        {!mdDownDisplay && (
          <Box>
            {defaultHeaderNavs.map((item, index) => (
              <Button
                key={item.path}
                onClick={() => {
                  routerPush(item.path)
                }}
                color={
                  router.asPath.includes(item.activePath)
                    ? 'primary'
                    : 'secondary'
                }
                sx={{ ml: index === 0 ? 2 : 6 }}
              >
                {t(item.label)}
              </Button>
            ))}
          </Box>
        )}
        <div style={{ flexGrow: 1 }} />
        <LanguageChanger />
        <ColorModeChanger />
        <Box pl={2}></Box>
      </Toolbar>
    </>
  )
}
