import { useEffect, useState } from 'react'
import {
  ListItem,
  ListItemText,
  Collapse,
  List,
  Typography,
} from '@mui/material'
import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material'
import useI18nRouter from '@/hooks/useI18nRouter'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

type Props = {
  label: string
  activePath: string
  list: {
    path: string
    label: string
  }[]
}

export default function CollapseListItem({ label, activePath, list }: Props) {
  const [open, setOpen] = useState(false)
  const { router, routerPush } = useI18nRouter()
  const theme = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    if (router.asPath.includes(activePath)) {
      setOpen(true)
    }
  }, [router.asPath, activePath])

  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen(!open)
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
        {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {list.map((item) => (
            <ListItem
              key={item.path}
              button
              onClick={() => {
                routerPush(item.path)
              }}
              selected={router.asPath.includes(item.path)}
              sx={{
                pl: 4,
                borderRadius: '0 24px 24px 0',
                height: '48px',
                color: router.asPath.includes(item.path)
                  ? theme.palette.primary.main
                  : 'inherit',
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color={
                      router.asPath.includes(item.path)
                        ? theme.palette.primary.main
                        : 'inherit'
                    }
                  >
                    {t(item.label)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}
