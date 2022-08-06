import type { ReactElement } from 'react'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import {
  Container,
  Box,
  Typography,
  useMediaQuery,
  Button,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import Link from '@/components/routing/Link'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default function Custom404() {
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  const lgUpDisplay = useMediaQuery(theme.breakpoints.up('lg'))
  const { t } = useTranslation(['common'])
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '80vh' }}
      >
        <Box textAlign="center">
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: xsDisplay ? '32px' : !lgUpDisplay ? '104px' : '128px',
              }}
              color="secondary.dark"
              fontWeight={800}
            >
              404
            </Typography>
          </Box>
          <Box pb={xsDisplay ? 4 : 5}>
            <Typography
              variant="body1"
              fontWeight={800}
              sx={{
                fontSize: xsDisplay ? '16px' : !lgUpDisplay ? '64px' : '80px',
              }}
              color="secondary.light"
            >
              Not Found
            </Typography>
          </Box>
          <Box pb={xsDisplay ? 2 : 4}>
            <Link href="/">
              <Button
                variant="contained"
                size={xsDisplay ? 'medium' : 'large'}
                color="secondary"
              >
                {t('common:backToTop')}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
