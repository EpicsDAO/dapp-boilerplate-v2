import { useState, useCallback } from 'react'

export default function useDialog() {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  return [open, handleOpen, handleClose] as const
}
