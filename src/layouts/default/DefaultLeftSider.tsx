import { Toolbar, Box, List, useMediaQuery } from '@mui/material'
import useI18nRouter from '@/hooks/useI18nRouter'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useTheme } from '@mui/material/styles'

import SingleListItemWithIcon from '@/components/nav/SingleListItemWithIcon'
import { useTranslation } from 'next-i18next'
import { useRecoilValue } from 'recoil'
import { colorModeState } from '@/store/colorMode'
import logoHorizontal from '@/assets/img/logo/Epics-logo-horizontal.svg'
import logoHorizontalWhite from '@/assets/img/logo/Epics-logo-horizontal-white.svg'

import defaultLeftSiderNavs from '@/components/nav/default/defaultLeftSiderNavs'

export default function DefaultLeftSider() {
  const { routerPush } = useI18nRouter()
  const { t } = useTranslation()
  const colorMode = useRecoilValue(colorModeState)
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <>
      <Toolbar disableGutters>
        <Box
          mt={xsDisplay ? 1 : 0}
          onClick={() => {
            routerPush('/')
          }}
          sx={{ cursor: 'pointer' }}
        >
          <LazyLoadImage
            width="140"
            height="40"
            src={
              colorMode === 'light'
                ? logoHorizontal.src
                : logoHorizontalWhite.src
            }
            alt="Logo"
            effect="opacity"
          />
        </Box>
      </Toolbar>
      <Box
        pr={1}
        sx={{
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <List component="nav">
          {defaultLeftSiderNavs.map((item) => (
            <SingleListItemWithIcon
              key={item.label}
              icon={item.icon}
              path={item.path}
              label={t(item.label)}
              activePath={item.activePath}
            />
          ))}
        </List>
      </Box>
    </>
  )
}
