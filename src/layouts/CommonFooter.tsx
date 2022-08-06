import { useCallback, useMemo } from 'react'
import {
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Link,
  useMediaQuery,
  Divider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faInstagram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons'
import { KeyboardDoubleArrowUpRounded } from '@mui/icons-material'
import { useRecoilValue } from 'recoil'
import { colorModeState } from '@/store/colorMode'
import { EpicsGrey } from '@/constants/colors'
import { useTranslation } from 'next-i18next'
import LinkComponent from '@/components/routing/Link'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import logoSquare from '@/assets/img/logo/Epics-logo.svg'
import logoSquareWhite from '@/assets/img/logo/Epics-logo-white.svg'

export default function CommonFooter() {
  const colorMode = useRecoilValue(colorModeState)
  const { t } = useTranslation()
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <Container maxWidth="xl">
        <Divider />
        <Box py={4} />
        {xsDisplay && (
          <>
            <Box>
              <Box pt={6} pb={4}>
                <Toolbar>
                  <div style={{ flexGrow: 1 }} />
                  <Box>
                    <Tooltip title={t('common:scrollToTop')} placement="top">
                      <IconButton
                        aria-label="Top"
                        onClick={() => {
                          scrollToTop()
                        }}
                      >
                        <KeyboardDoubleArrowUpRounded />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <div style={{ flexGrow: 1 }} />
                </Toolbar>
              </Box>
              <Box pt={6} pb={4}>
                <Toolbar>
                  <div style={{ flexGrow: 1 }} />
                  <Box width="80px">
                    <LinkComponent href="/">
                      <LazyLoadImage
                        width={80}
                        height={80}
                        src={
                          colorMode === 'light'
                            ? logoSquare.src
                            : logoSquareWhite.src
                        }
                        alt="Logo"
                        effect="opacity"
                      />
                    </LinkComponent>
                  </Box>
                  <div style={{ flexGrow: 1 }} />
                </Toolbar>
              </Box>

              <Box py={2} textAlign="center">
                <LinkComponent href="/legal/privacy-policy">
                  <Link
                    underline="hover"
                    variant="body2"
                    color="secondary"
                    sx={{ cursor: 'pointer' }}
                    component="button"
                  >
                    {t('common:privacy')}
                  </Link>
                </LinkComponent>
              </Box>

              <Toolbar>
                <div style={{ flexGrow: 1 }} />
                <Box pr={1}>
                  <Tooltip title="Twitter" placement="top">
                    <IconButton
                      href={`https://twitter.com/${process.env.twitterAccount}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter link"
                    >
                      <FontAwesomeIcon
                        color={
                          colorMode === 'light' ? EpicsGrey[200] : '#FFFFFF'
                        }
                        icon={faTwitter}
                        size="sm"
                        aria-label="Twitter icon"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box pr={1}>
                  <Tooltip title="Instagram" placement="top">
                    <IconButton
                      href={`https://instagram.com/${process.env.instagramAccount}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram link"
                    >
                      <FontAwesomeIcon
                        color={
                          colorMode === 'light' ? EpicsGrey[200] : '#FFFFFF'
                        }
                        icon={faInstagram}
                        size="sm"
                        aria-label="Instagram icon"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box pr={1}>
                  <Tooltip title="Discord" placement="top">
                    <IconButton
                      href={`${process.env.discordInvitationLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Discord link"
                    >
                      <FontAwesomeIcon
                        color={
                          colorMode === 'light' ? EpicsGrey[200] : '#FFFFFF'
                        }
                        icon={faDiscord}
                        size="sm"
                        aria-label="Discord icon"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title="GitHub" placement="top">
                    <IconButton
                      href={`https://github.com/${process.env.githubAccount}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub link"
                    >
                      <FontAwesomeIcon
                        color={
                          colorMode === 'light' ? EpicsGrey[200] : '#FFFFFF'
                        }
                        icon={faGithub}
                        size="sm"
                        aria-label="GitHub icon"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <div style={{ flexGrow: 1 }} />
              </Toolbar>
              <Box textAlign="center" py={4}>
                <Typography variant="caption">
                  ©{new Date().getFullYear()} {process.env.copyright}
                </Typography>
              </Box>
            </Box>
          </>
        )}
        {!xsDisplay && (
          <>
            <Box pt={6} pb={4}>
              <Toolbar>
                <Box>
                  <LinkComponent href="/">
                    <LazyLoadImage
                      width={80}
                      height={80}
                      src={
                        colorMode === 'light'
                          ? logoSquare.src
                          : logoSquareWhite.src
                      }
                      alt="Logo"
                      effect="opacity"
                    />
                  </LinkComponent>
                </Box>
                <div style={{ flexGrow: 1 }} />
                <Box>
                  <Tooltip title={t('common:scrollToTop')} placement="top">
                    <IconButton
                      aria-label="Top"
                      onClick={() => {
                        scrollToTop()
                      }}
                    >
                      <KeyboardDoubleArrowUpRounded />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Toolbar>
            </Box>
            <Toolbar sx={{ height: '104px' }}>
              <Typography variant="caption">
                ©{new Date().getFullYear()} {process.env.copyright}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <Box pr={1}>
                <Tooltip title="Twitter" placement="top">
                  <IconButton
                    href={`https://twitter.com/${process.env.twitterAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter link"
                  >
                    <FontAwesomeIcon
                      color={colorMode === 'light' ? EpicsGrey[200] : '#FFFFFF'}
                      icon={faTwitter}
                      size="sm"
                      aria-label="Twitter icon"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box pr={1}>
                <Tooltip title="Instagram" placement="top">
                  <IconButton
                    href={`https://instagram.com/${process.env.instagramAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram link"
                  >
                    <FontAwesomeIcon
                      color={colorMode === 'light' ? EpicsGrey[200] : '#FFFFFF'}
                      icon={faInstagram}
                      size="sm"
                      aria-label="Instagram icon"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box pr={1}>
                <Tooltip title="Discord" placement="top">
                  <IconButton
                    href={`${process.env.discordInvitationLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord link"
                  >
                    <FontAwesomeIcon
                      color={colorMode === 'light' ? EpicsGrey[200] : '#FFFFFF'}
                      icon={faDiscord}
                      size="sm"
                      aria-label="Discord icon"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="GitHub" placement="top">
                  <IconButton
                    href={`https://github.com/${process.env.githubAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub link"
                  >
                    <FontAwesomeIcon
                      color={colorMode === 'light' ? EpicsGrey[200] : '#FFFFFF'}
                      icon={faGithub}
                      size="sm"
                      aria-label="GitHub icon"
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              <div style={{ flexGrow: 1 }} />

              <Box>
                <LinkComponent href="/legal/privacy-policy">
                  <Link
                    underline="hover"
                    variant="body2"
                    color="secondary"
                    sx={{ cursor: 'pointer' }}
                    component="button"
                  >
                    {t('common:privacy')}
                  </Link>
                </LinkComponent>
              </Box>
            </Toolbar>
          </>
        )}
      </Container>
    </>
  )
}
