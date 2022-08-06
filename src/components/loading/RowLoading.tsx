import { Box, Container, Skeleton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function RowLoading() {
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <>
      <Container maxWidth="lg">
        <Box
          py={xsDisplay ? 16 : 24}
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="100%">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Skeleton width={xsDisplay ? '60%' : '30%'} height={48} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Skeleton width={xsDisplay ? '90%' : '60%'} height={440} />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}
