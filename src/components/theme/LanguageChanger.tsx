import { IconButton, Menu, MenuItem } from '@mui/material'
import { TranslateRounded } from '@mui/icons-material'
import { useState } from 'react'

import useChangeLanguage from '@/hooks/useChangeLanguage'

export default function LanguageChanger() {
  const { changeLanguage } = useChangeLanguage()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <TranslateRounded />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => {
            changeLanguage('ja')
            handleClose()
          }}
        >
          日本語
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage('en')
            handleClose()
          }}
        >
          English
        </MenuItem>
      </Menu>
    </>
  )
}
