import { useMemo } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import useI18nRouter from '@/hooks/useI18nRouter'
import { useTheme } from '@mui/material/styles'
import { DashboardRounded } from '@mui/icons-material'
import { useTranslation } from 'next-i18next'

import { useRecoilValue } from 'recoil'
import { colorModeState } from '@/store/colorMode'

type IconKey = 'home'

type Props = {
  path: string
  label: string
}

export default function SingleListItemWithIcon({ path, label }: Props) {
  const colorMode = useRecoilValue(colorModeState)
  const { t, i18n } = useTranslation()
  const { router, routerPush } = useI18nRouter()
  const theme = useTheme()

  const icons = useMemo(() => {
    return {
      home: (
        <DashboardRounded
          color={
            path === '/'
              ? router.asPath === `/${i18n.language}/`
                ? 'primary'
                : 'secondary'
              : router.asPath.includes(path)
              ? 'primary'
              : 'secondary'
          }
        />
      ),
    }
  }, [i18n.language, router.asPath, path])

  return (
    <>
      <ListItem
        button
        key={`SingleListItemWithIcon${path}`}
        selected={
          path === '/'
            ? router.asPath === `/${i18n.language}/`
            : router.asPath.includes(path)
        }
        onClick={() => {
          if (router.asPath !== path) {
            routerPush(path)
          }
        }}
        sx={{
          borderRadius: '0 24px 24px 0',
          height: '48px',
          color:
            path === '/'
              ? router.asPath === `/${i18n.language}/`
                ? theme.palette.primary.main
                : 'inherit'
              : router.asPath.includes(path)
              ? theme.palette.primary.main
              : 'inherit',
        }}
      >
        <ListItemIcon>{icons[label as IconKey]}</ListItemIcon>
        <ListItemText primary={t(`common:navs.${label}`)} />
      </ListItem>
    </>
  )
}
