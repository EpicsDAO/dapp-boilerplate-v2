import { ListItem, ListItemText } from '@mui/material'
import useI18nRouter from '@/hooks/useI18nRouter'
import { useTheme } from '@mui/material/styles'

type Props = {
  path: string
  label: string
  activePath: string
}

export default function SingleListItem({ path, label, activePath }: Props) {
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
        <ListItemText primary={label} />
      </ListItem>
    </>
  )
}
