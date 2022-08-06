import { atom } from 'recoil'

type ColorModeState = 'light' | 'dark'

export const colorModeState = atom<ColorModeState>({
  key: 'colorModeState',
  default: 'light',
})
