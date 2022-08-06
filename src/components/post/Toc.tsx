import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

type Props = {
  toc: {
    id: string
    depth: number
    value: string
  }[]
  activeItemIds: string[]
  handleClose: () => void
}

export default function Toc({ toc, activeItemIds, handleClose }: Props) {
  const theme = useTheme()
  const lgDownDisplay = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <>
      <Box
        pl={lgDownDisplay ? undefined : 1}
        sx={{
          borderLeft: lgDownDisplay
            ? undefined
            : `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <List component="nav">
          {toc.map((item) => (
            <ListItem
              button
              key={item.id}
              sx={{
                pl: (item.depth - 2) * 2,
                my: 1,
                borderRadius: '12px',
                height: '48px',
              }}
              onClick={() => {
                location.href = `#${item.id}`
                if (lgDownDisplay) {
                  handleClose()
                }
              }}
            >
              <Box pl={2}>
                <ListItemText
                  primary={
                    <Typography
                      variant="caption"
                      color={
                        activeItemIds.includes(item.id)
                          ? 'primary.main'
                          : 'secondary.main'
                      }
                      fontWeight={
                        activeItemIds.includes(item.id) ? 700 : undefined
                      }
                    >
                      {item.value}
                    </Typography>
                  }
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )
}
