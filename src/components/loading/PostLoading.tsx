import { Box, Container, Skeleton, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function PostLoading() {
  const theme = useTheme()
  const lgDownDisplay = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <>
      <Container maxWidth="lg">
        <Skeleton width="40%" height={32} />
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Box>
              <Skeleton width="90%" />
              <Skeleton width="80%" />
              <Skeleton width="70%" />
            </Box>
            <Box pt={4}>
              <Skeleton width="100%" height={440} />
            </Box>
          </Grid>
          {!lgDownDisplay && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Skeleton width="90%" />
                <Skeleton width="80%" />
                <Skeleton width="70%" />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  )
}
