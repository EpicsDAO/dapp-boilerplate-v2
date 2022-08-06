import { Box, Skeleton } from '@mui/material'

export default function ParagraphLoading() {
  return (
    <>
      <Box p={2}>
        <Skeleton width={'70%'} />
        <Skeleton width={'60%'} />
        <Skeleton width={'50%'} />
      </Box>
    </>
  )
}
