import { Box, Container, Skeleton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function BoxLoading() {
  const theme = useTheme()
  return (
    <>
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="100%">
          <Box
            pt={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Skeleton width={'60%'} height={48} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Skeleton width={'90%'} height={440} />
          </Box>
        </Box>
      </Box>
    </>
  )
}
