import { useState, useCallback } from 'react'
export default function useVisibilitySensor() {
  const [visible, setVisible] = useState(false)
  const onVisibleChange = useCallback(
    (isVisible: boolean) => {
      if (isVisible && !visible) {
        setVisible(true)
      }
    },
    [visible]
  )
  return [visible, onVisibleChange] as const
}
