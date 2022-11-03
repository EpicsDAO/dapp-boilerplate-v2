import { Box, Container, Skeleton, Grid } from '@mui/material'

export default function DashboardLoading() {
  return (
    <>
      <Container maxWidth="md">
        <Skeleton width={'60%'} />
        <Skeleton width={'50%'} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Skeleton width={'100%'} height={336} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Skeleton width={'100%'} height={336} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Skeleton width={'100%'} height={336} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Skeleton width={'100%'} height={336} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
