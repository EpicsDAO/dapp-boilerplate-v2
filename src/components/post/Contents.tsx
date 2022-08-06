import {
  Container,
  Grid,
  useMediaQuery,
  Fab,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import { TocRounded } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import 'highlight.js/styles/github-dark.css'

import useDialog from '@/hooks/useDialog'
import Seo from '@/components/theme/Seo'
import ScrollSyncToc from '@/components/post/ScrollSyncToc'
import { useTranslation } from 'next-i18next'

type Props = {
  post: {
    title: string
    asPath: string
    description: string
    content: string
  }
  postHtml: string
}

export default function Contents({ post, postHtml }: Props) {
  const router = useRouter()
  const theme = useTheme()
  const lgDownDisplay = useMediaQuery(theme.breakpoints.down('lg'))
  const [open, handleOpen, handleClose] = useDialog()
  const { t } = useTranslation()

  return (
    <>
      <Seo
        pathname={router.asPath}
        title={post.title}
        description={post.description}
      />
      <Container maxWidth="lg">
        <Box pb={8}>
          <h1>{post.title}</h1>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <Box>
                <div dangerouslySetInnerHTML={{ __html: postHtml }} />
              </Box>
            </Grid>
            {!lgDownDisplay && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                  <ScrollSyncToc
                    rawMarkdownBody={post.content}
                    handleClose={handleClose}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
      {lgDownDisplay && (
        <>
          <Fab
            size="small"
            color="secondary"
            aria-label="Toc"
            sx={{ position: 'fixed', bottom: 16, right: 20 }}
            onClick={handleOpen}
          >
            <TocRounded />
          </Fab>

          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{ elevation: 0 }}
          >
            <Box p={2}>
              <DialogTitle>{t('common:toc')}</DialogTitle>
              <DialogContent>
                <ScrollSyncToc
                  rawMarkdownBody={post.content}
                  handleClose={handleClose}
                />
              </DialogContent>
            </Box>
          </Dialog>
        </>
      )}
    </>
  )
}
