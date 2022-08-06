import { useState, useEffect, useCallback } from 'react'
import {
  Container,
  Box,
  Typography,
  useMediaQuery,
  Toolbar,
  Tooltip,
  IconButton,
  Skeleton,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { walletState } from '@/store/wallet'
import { useRecoilValue } from 'recoil'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@mui/material/styles'
import { EpicsGrey } from '@/constants/colors'
import { colorModeState } from '@/store/colorMode'
import { RefreshRounded } from '@mui/icons-material'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export default function SolanaWalletRow() {
  const { publicKey } = useWallet()
  const { t } = useTranslation()
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  const colorMode = useRecoilValue(colorModeState)
  const { enqueueSnackbar } = useSnackbar()
  const { network, connection } = useRecoilValue(walletState)
  const [balance, setBalance] = useState(0)
  const [airdropLoading, setAirdropLoading] = useState(false)
  const [balanceLoading, setBalanceLoading] = useState(false)

  const getBalance = useCallback(async () => {
    setBalanceLoading(true)
    try {
      const lamportsBalance = await connection.getBalance(publicKey!)
      const solBalance = lamportsBalance / LAMPORTS_PER_SOL
      setBalance(solBalance)
    } catch {
      enqueueSnackbar(`${t('home:getBalanceError')}`, { variant: 'error' })
    } finally {
      setBalanceLoading(false)
    }
  }, [setBalance, connection, enqueueSnackbar, publicKey, t])

  const handleRequestAirdrop = useCallback(async () => {
    setAirdropLoading(true)
    try {
      await connection.requestAirdrop(publicKey!, 1e9)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch {
      enqueueSnackbar(`${t('home:tryLater')}`, { variant: 'error' })
    } finally {
      await getBalance()
      enqueueSnackbar(`${t('home:airdropSuccess')}`, { variant: 'success' })
      setAirdropLoading(false)
    }
  }, [enqueueSnackbar, setAirdropLoading, connection, getBalance, publicKey, t])

  useEffect(() => {
    if (publicKey) {
      getBalance()
    }
  }, [getBalance, publicKey])

  if (!publicKey) {
    return (
      <>
        <Container maxWidth="sm">
          <Box py={16} textAlign="center">
            <Box
              sx={{
                background:
                  colorMode === 'light'
                    ? EpicsGrey[100]
                    : theme.palette.grey[900],
                borderRadius: `${theme.shape.borderRadius}px`,
                width: '100%',
                height: '100%',
              }}
            >
              <Box px={xsDisplay ? 4 : 6} py={6}>
                <Typography variant="h3">{t('home:pleaseConnect')}</Typography>
                <Box pt={6}>
                  <Toolbar>
                    <div style={{ flexGrow: 1 }} />
                    <WalletMultiButton />
                    <div style={{ flexGrow: 1 }} />
                  </Toolbar>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </>
    )
  }
  return (
    <>
      <Container maxWidth="sm">
        <Box py={16}>
          <Box
            sx={{
              background:
                colorMode === 'light'
                  ? EpicsGrey[100]
                  : theme.palette.grey[900],
              borderRadius: `${theme.shape.borderRadius}px`,
              width: '100%',
              height: '100%',
            }}
          >
            <Box px={xsDisplay ? 4 : 6} py={6} textAlign="center">
              <Box py={2}>
                <Typography variant="h4">GM 🙌 </Typography>
              </Box>

              <Box pb={6}>
                <Toolbar variant="dense">
                  <div style={{ flexGrow: 1 }} />
                  <Typography variant="caption">
                    {t('home:balance')} ({network})
                  </Typography>

                  <Tooltip title={t('home:update') || false} placement="top">
                    <IconButton edge="end" onClick={() => getBalance()}>
                      <RefreshRounded />
                    </IconButton>
                  </Tooltip>
                  <div style={{ flexGrow: 1 }} />
                </Toolbar>
                {balanceLoading ? (
                  <Box>
                    <Skeleton
                      height={32}
                      width="50%"
                      sx={{ margin: '0 auto' }}
                    />
                  </Box>
                ) : (
                  <Typography variant="h3" sx={{ marginTop: '0 !important' }}>
                    {balance}
                    <span
                      style={{ fontSize: '1.33333rem', marginLeft: '0.8rem' }}
                    >
                      SOL
                    </span>
                  </Typography>
                )}
                <Box py={2}>
                  <LoadingButton
                    variant="outlined"
                    size="small"
                    color="secondary"
                    loading={airdropLoading}
                    onClick={() => {
                      handleRequestAirdrop()
                    }}
                  >
                    GET 1 SOL
                  </LoadingButton>
                </Box>
              </Box>
              <Toolbar>
                <div style={{ flexGrow: 1 }} />
                <WalletMultiButton />
                <div style={{ flexGrow: 1 }} />
              </Toolbar>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}
