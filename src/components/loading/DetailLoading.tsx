import { Box, Container, Skeleton, Grid } from '@mui/material'

export default function DetailLoading() {
  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Skeleton width={'100%'} height={720} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
