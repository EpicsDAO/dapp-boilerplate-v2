import type { ReactNode } from 'react'
import { useState, useEffect, useCallback } from 'react'
import DefaultHeader from './DefaultHeader'
import DefaultLeftSider from './DefaultLeftSider'
import { Box, Drawer, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import CommonFooter from '../CommonFooter'

type Props = {
  children: ReactNode
}

export default function DefaultLayout({ children }: Props) {
  const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), [])
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const theme = useTheme()
  const mdDownDisplay = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()

  useEffect(() => {
    setMobileMenuVisible(false)
    const pageComponent = document.getElementById('page-component')
    console.log(pageComponent)
    if (pageComponent != null && !router.asPath.includes('#')) {
      resetWindowScrollPosition()
      pageComponent.scrollTop = 0
    }
  }, [router.asPath, resetWindowScrollPosition])

  return (
    <>
      <nav>
        {mdDownDisplay && (
          <Drawer
            variant="temporary"
            open={mobileMenuVisible}
            onClose={() => setMobileMenuVisible(false)}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Box width="272px" height="100vh">
              <DefaultLeftSider />
            </Box>
          </Drawer>
        )}
        {!mdDownDisplay && (
          <Drawer
            variant="permanent"
            PaperProps={{ sx: { border: 'none', zIndex: 1 } }}
          >
            <Box
              width="272px"
              height="100vh - 64px"
              sx={{
                position: 'sticky',
                top: 0,
              }}
            >
              <DefaultLeftSider />
            </Box>
          </Drawer>
        )}
      </nav>

      <main
        style={{
          marginLeft: mdDownDisplay ? '0px' : '272px',
          width: mdDownDisplay ? '100%' : 'calc(100% - 272px)',
          height: '100vh',
          overflowY: 'auto',
        }}
        id="page-component"
      >
        <header>
          <DefaultHeader setMobileMenuVisible={setMobileMenuVisible} />
        </header>
        <Box sx={{ minHeight: '80vh' }} pb={6}>
          {children}
        </Box>
        <footer>
          <CommonFooter />
        </footer>
      </main>
    </>
  )
}
