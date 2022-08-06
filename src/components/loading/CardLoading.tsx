import { Box, Skeleton } from '@mui/material'

export default function BoxLoading() {
  return (
    <>
      <Box width="100%" px={3} py={4}>
        <Skeleton width={'100%'} height={336} />
      </Box>
    </>
  )
}
