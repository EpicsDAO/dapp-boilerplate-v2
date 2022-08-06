import { useCallback, useEffect } from 'react'
import { IconButton } from '@mui/material'
import { LightModeRounded, DarkModeRounded } from '@mui/icons-material'

import { EpicsGrey, EpicsBlue } from '@/constants/colors'
import { useRecoilState } from 'recoil'
import { colorModeState } from '@/store/colorMode'

export default function ColorModeChanger() {
  const [colorMode, setColorMode] = useRecoilState(colorModeState)
  const toggleColorMode = useCallback(() => {
    colorMode === 'light' ? setColorMode('dark') : setColorMode('light')
  }, [colorMode, setColorMode])

  useEffect(() => {
    switch (colorMode) {
      case 'light': {
        document.documentElement.style.setProperty(
          '--Epics-title',
          EpicsGrey[500]
        )
        document.documentElement.style.setProperty(
          '--Epics-main',
          EpicsGrey[400]
        )
        document.documentElement.style.setProperty('--Epics-bg', EpicsGrey[100])
        document.documentElement.style.setProperty(
          '--Epics-border',
          EpicsGrey.border
        )

        document.documentElement.style.setProperty(
          '--Epics-link',
          EpicsBlue[400]
        )
        document.documentElement.style.setProperty(
          '--Epics-link-hover',
          EpicsBlue[300]
        )
        document.documentElement.style.setProperty(
          '--Epics-link-visited',
          EpicsBlue[500]
        )

        break
      }
      case 'dark': {
        document.documentElement.style.setProperty(
          '--Epics-title',
          EpicsGrey.contrastText
        )
        document.documentElement.style.setProperty(
          '--Epics-main',
          EpicsGrey.darkTextMain
        )
        document.documentElement.style.setProperty('--Epics-bg', EpicsGrey[500])
        document.documentElement.style.setProperty(
          '--Epics-border',
          EpicsGrey[400]
        )
        document.documentElement.style.setProperty(
          '--Epics-link',
          EpicsBlue[200]
        )
        document.documentElement.style.setProperty(
          '--Epics-link-hover',
          EpicsBlue[100]
        )
        document.documentElement.style.setProperty(
          '--Epics-link-visited',
          EpicsBlue[300]
        )
        break
      }
    }
  }, [colorMode])

  return (
    <>
      <IconButton onClick={() => toggleColorMode()}>
        {colorMode === 'light' ? (
          <DarkModeRounded aria-label="Dark Mode" />
        ) : (
          <LightModeRounded aria-label="Light Mode" />
        )}
      </IconButton>
    </>
  )
}
