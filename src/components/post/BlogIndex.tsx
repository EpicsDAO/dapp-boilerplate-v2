import { useMemo } from 'react'
import {
  Container,
  Grid,
  useMediaQuery,
  Box,
  Toolbar,
  Chip,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useRecoilValue } from 'recoil'
import { colorModeState } from '@/store/colorMode'
import Seo from '@/components/theme/Seo'
import { useTranslation } from 'next-i18next'
import useI18nRouter from '@/hooks/useI18nRouter'

type Post = {
  title: string
  category: string
  thumbnail: string
  date: string
}

type Props = {
  posts: Post[]
  urls: string[]
}

export default function BlogIndex({ posts, urls }: Props) {
  const { routerPush } = useI18nRouter()
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  const lgUpDisplay = useMediaQuery(theme.breakpoints.up('lg'))
  const colorMode = useRecoilValue(colorModeState)

  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => {
    return i18n.language === 'ja'
  }, [i18n])

  return (
    <>
      <Seo
        pathname="/blog"
        title={t('blog:title')}
        description={t('blog:description')}
      />
      <Container maxWidth="xl">
        <Box pt={4} pb={16}>
          <Toolbar disableGutters>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: xsDisplay
                    ? '40px'
                    : !lgUpDisplay
                    ? '48px'
                    : isJapanese
                    ? '64px'
                    : '64px',
                  lineHeight: isJapanese ? 1.14286 : 1,
                  textShadow:
                    colorMode === 'light'
                      ? undefined
                      : '0 0 80px rgb(192 219 255 / 75%), 0 0 32px rgb(65 120 255 / 24%)',
                }}
                fontWeight={900}
              >
                {t('blog:title')}
              </Typography>
            </Box>
          </Toolbar>
          <Grid container spacing={8} justifyContent="center">
            {posts.map((post, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={post.title}>
                <Box py={6}>
                  <Box
                    py={2}
                    sx={{ cursor: 'pointer', ':hover': { opacity: 0.8 } }}
                    onClick={() => {
                      routerPush(urls[index])
                    }}
                  >
                    <Box py={2}>
                      <LazyLoadImage
                        width="100%"
                        src={post.thumbnail}
                        alt="Logo"
                        effect="opacity"
                        style={{
                          borderRadius: `${theme.shape.borderRadius}px`,
                          aspectRatio: '3 / 2',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Box>
                      <Chip label={post.category} color="secondary" />
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: xsDisplay
                            ? '24px'
                            : !lgUpDisplay
                            ? '28px'
                            : '32px',
                          lineHeight: 1.14286,
                          marginTop: xsDisplay
                            ? '8px !important'
                            : '12px !important',
                          textDecoration: 'none !important',
                        }}
                        fontWeight={700}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: xsDisplay
                            ? '16px'
                            : !lgUpDisplay
                            ? '20px'
                            : '24px',
                          lineHeight: 1.14286,
                          marginTop: '4px !important',
                          textDecoration: 'none !important',
                        }}
                        fontWeight={700}
                        color="secondary.light"
                      >
                        {post.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  )
}
