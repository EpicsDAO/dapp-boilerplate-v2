import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect, useState } from 'react'
import {
  Toolbar,
  useMediaQuery,
  IconButton,
  Box,
  Fade,
  AppBar,
} from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MenuRounded } from '@mui/icons-material'
import LinkComponent from '@/components/routing/Link'
import { useRecoilValue } from 'recoil'
import { colorModeState } from '@/store/colorMode'
import { useTheme } from '@mui/material/styles'

import logo from '@/assets/img/logo/Epics-logo.svg'
import logoWhite from '@/assets/img/logo/Epics-logo-white.svg'
import LanguageChanger from '@/components/theme/LanguageChanger'
import ColorModeChanger from '@/components/theme/ColorModeChanger'

type Props = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  drawerWidth: number
  headerHeight: number
}

export default function DefaultHeader({
  setMenuOpen,
  drawerWidth,
  headerHeight,
}: Props) {
  const colorMode = useRecoilValue(colorModeState)
  const theme = useTheme()
  const mdDownDisplay = useMediaQuery(theme.breakpoints.down('md'))
  const [scrollY, setScrollY] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
    if (window.scrollY > 104 && scrollY > window.scrollY) {
      setIsScrollingUp(true)
    } else {
      setIsScrollingUp(false)
    }
  }, [setScrollY, setIsScrollingUp, scrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <>
      <Toolbar
        sx={{
          height: `${headerHeight}px`,
          width: mdDownDisplay ? '100%' : `calc(100% - ${drawerWidth}px)`,
          ml: { md: `${drawerWidth}px` },
        }}
      >
        {mdDownDisplay && (
          <Box mx={1}>
            <IconButton
              edge="start"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <MenuRounded aria-label="Menu" />
            </IconButton>
          </Box>
        )}
        {mdDownDisplay && (
          <Box sx={{ marginTop: '4px' }}>
            <LinkComponent href="/">
              <LazyLoadImage
                width={40}
                height={40}
                src={colorMode === 'light' ? logo.src : logoWhite.src}
                alt="Logo"
                effect="opacity"
              />
            </LinkComponent>
          </Box>
        )}

        <div style={{ flexGrow: 1 }} />
        <LanguageChanger />
        <ColorModeChanger />
      </Toolbar>

      {isScrollingUp && (
        <Fade in={isScrollingUp}>
          <AppBar position="fixed" color="inherit" elevation={0}>
            <Toolbar
              sx={{
                width: mdDownDisplay ? '100%' : `calc(100% - ${drawerWidth}px)`,
                ml: { md: `${drawerWidth}px` },
              }}
            >
              {mdDownDisplay && (
                <Box mr={1}>
                  <IconButton
                    edge="start"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Menu"
                  >
                    <MenuRounded aria-label="Menu" />
                  </IconButton>
                </Box>
              )}
              {mdDownDisplay && (
                <Box sx={{ marginTop: '4px' }}>
                  <LinkComponent href="/">
                    <LazyLoadImage
                      width={40}
                      height={40}
                      src={colorMode === 'light' ? logo.src : logoWhite.src}
                      alt="Logo"
                      effect="opacity"
                    />
                  </LinkComponent>
                </Box>
              )}

              <div style={{ flexGrow: 1 }} />
              <LanguageChanger />
              <ColorModeChanger />
            </Toolbar>
          </AppBar>
        </Fade>
      )}
    </>
  )
}
