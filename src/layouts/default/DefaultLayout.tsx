import type { ReactNode } from 'react'
import { useState, useEffect, useCallback } from 'react'
import DefaultHeader from './DefaultHeader'
import DefaultLeftSider from './DefaultLeftSider'
import CommonFooter from '../CommonFooter'
import { Box, Drawer, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

const drawerWidth = 272
const headerHeight = 104

type Props = {
  children: ReactNode
}

export default function DefaultLayout({ children }: Props) {
  const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), [])
  const [menuOpen, setMenuOpen] = useState(false)
  const theme = useTheme()
  const mdDownDisplay = useMediaQuery(theme.breakpoints.down('md'))

  const router = useRouter()

  useEffect(() => {
    setMenuOpen(false)
    const pageComponent = document.getElementById('page-component')
    if (pageComponent != null && !router.asPath.includes('#')) {
      resetWindowScrollPosition()
    }
  }, [router.asPath, resetWindowScrollPosition])

  return (
    <>
      <header>
        <DefaultHeader
          setMenuOpen={setMenuOpen}
          drawerWidth={drawerWidth}
          headerHeight={headerHeight}
        />
      </header>
      <nav>
        {mdDownDisplay && (
          <Drawer
            variant="temporary"
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Box width={`${drawerWidth}px`}>
              <DefaultLeftSider headerHeight={headerHeight} />
            </Box>
          </Drawer>
        )}
        {!mdDownDisplay && (
          <Drawer
            variant="permanent"
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            sx={{ border: 'none !important' }}
            PaperProps={{ sx: { border: 'none !important' } }}
          >
            <Box width={`${drawerWidth}px`}>
              <DefaultLeftSider headerHeight={headerHeight} />
            </Box>
          </Drawer>
        )}
      </nav>
      <main
        id="page-component"
        style={{
          minHeight: 'calc(100vh - 208px)',
          width: mdDownDisplay ? '100%' : `calc(100% - ${drawerWidth}px)`,
          marginLeft: mdDownDisplay ? 0 : `${drawerWidth}px`,
        }}
      >
        {children}
        <footer>
          <CommonFooter />
        </footer>
      </main>
    </>
  )
}
