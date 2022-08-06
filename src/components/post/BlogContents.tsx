import {
  Container,
  Grid,
  useMediaQuery,
  Fab,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Toolbar,
  Chip,
  Typography,
} from '@mui/material'
import { TocRounded } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import 'highlight.js/styles/github-dark.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { markdownToTxt } from 'markdown-to-txt'

import useDialog from '@/hooks/useDialog'
import Seo from '@/components/theme/Seo'
import ScrollSyncToc from '@/components/post/ScrollSyncToc'
import { useTranslation } from 'next-i18next'

type Props = {
  post: {
    title: string
    asPath: string
    category: string
    thumbnail: string
    date: string
    content: string
  }
  postHtml: string
}

export default function BlogContents({ post, postHtml }: Props) {
  const router = useRouter()
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  const lgDownDisplay = useMediaQuery(theme.breakpoints.down('lg'))
  const [open, handleOpen, handleClose] = useDialog()
  const { t } = useTranslation()

  return (
    <>
      <Seo
        pathname={router.asPath}
        title={post.title}
        description={`${markdownToTxt(post.content).slice(0, 120)} ...`}
        img={post.thumbnail}
      />
      <Container maxWidth="lg">
        <Box pt={4} pb={16}>
          <Chip label={post.category} color="secondary" />
          <Toolbar disableGutters>
            <Box>
              <h1
                style={{
                  marginTop: xsDisplay ? '12px' : 0,
                  marginBottom: xsDisplay ? '12px' : 0,
                }}
              >
                {post.title}
              </h1>
              <Typography
                variant="h5"
                color="secondary.light"
                fontWeight={700}
                sx={{ marginTop: 0 }}
              >
                {post.date}
              </Typography>
            </Box>
          </Toolbar>

          <Box py={8}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                <LazyLoadImage
                  width="100%"
                  src={post.thumbnail}
                  alt="Logo"
                  effect="opacity"
                  style={{ borderRadius: `${theme.shape.borderRadius}px` }}
                />

                <Box py={8}>
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
