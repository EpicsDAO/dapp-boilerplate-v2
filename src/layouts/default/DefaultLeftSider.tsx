import { Toolbar, Box, List } from '@mui/material'
import useI18nRouter from '@/hooks/useI18nRouter'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import SingleListItemWithIcon from '@/components/list/SingleListItemWithIcon'
import { useRecoilValue } from 'recoil'
import { colorModeState } from '@/store/colorMode'
import logoHorizontal from '@/assets/img/logo/Epics-logo-horizontal.svg'
import logoHorizontalWhite from '@/assets/img/logo/Epics-logo-horizontal-white.svg'

import defaultLeftSiderNavs from '@/constants/navs/defaultLeftSiderNavs'

type Props = {
  headerHeight: number
}

export default function DefaultLeftSider({ headerHeight }: Props) {
  const { routerPush } = useI18nRouter()
  const colorMode = useRecoilValue(colorModeState)

  return (
    <>
      <Toolbar
        sx={{
          height: `${headerHeight}px`,
        }}
      >
        <Box
          onClick={() => {
            routerPush('/')
          }}
          sx={{ cursor: 'pointer' }}
        >
          <LazyLoadImage
            width="168"
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
          maxHeight: `calc(100vh - ${headerHeight}px)`,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <List component="nav">
          <>
            {defaultLeftSiderNavs.map((item) => (
              <SingleListItemWithIcon
                key={`DefaultLeftSiderListItem${item.path}`}
                path={item.path}
                label={item.label}
              />
            ))}
          </>
        </List>
      </Box>
    </>
  )
}
