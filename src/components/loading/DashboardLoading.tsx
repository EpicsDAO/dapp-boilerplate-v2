import { Box, Skeleton, Grid } from '@mui/material'

export default function BoxLoading() {
  return (
    <>
      <Box p={2}>
        <Skeleton width={'60%'} />
        <Skeleton width={'50%'} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton width={'100%'} height={336} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton width={'100%'} height={336} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton width={'100%'} height={336} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton width={'100%'} height={336} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
