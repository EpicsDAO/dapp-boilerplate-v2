import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import useI18nRouter from '@/hooks/useI18nRouter'
import { useTheme } from '@mui/material/styles'
import { HomeRounded } from '@mui/icons-material'

const icons = {
  home: <HomeRounded />,
}

type IconKey = 'home'

type Props = {
  icon: string
  path: string
  label: string
  activePath: string
}

export default function SingleListItem({
  icon,
  path,
  label,
  activePath,
}: Props) {
  const { router, routerPush } = useI18nRouter()
  const theme = useTheme()

  return (
    <>
      <ListItem
        button
        key={path}
        selected={router.asPath.includes(activePath)}
        onClick={() => {
          if (router.asPath !== path) {
            routerPush(path)
          }
        }}
        sx={{
          borderRadius: '0 24px 24px 0',
          height: '48px',
          color: router.asPath.includes(activePath)
            ? theme.palette.primary.main
            : 'inherit',
        }}
      >
        <ListItemIcon
          sx={{
            color: router.asPath.includes(activePath)
              ? theme.palette.primary.main
              : 'inherit',
          }}
        >
          {icons[icon as IconKey]}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </>
  )
}
