import {
  EpicsBlue,
  EpicsRed,
  EpicsYellow,
  EpicsGreen,
  EpicsGrey,
} from './colors'
import { jaJP, enUS } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

export const makeTheme = (isEnglish: boolean, mode: 'light' | 'dark') =>
  createTheme(
    {
      breakpoints: {
        values: {
          xs: 0,
          sm: 632,
          md: 896,
          lg: 1152,
          xl: 1440,
        },
      },
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              primary: {
                light: EpicsBlue[200],
                main: EpicsBlue[300],
                dark: EpicsBlue[400],
                contrastText: EpicsBlue.contrastText,
              },
              secondary: {
                light: EpicsGrey[200],
                main: EpicsGrey[400],
                dark: EpicsGrey[500],
                contrastText: EpicsGrey.contrastText,
              },
              error: {
                light: EpicsRed[200],
                main: EpicsRed[300],
                dark: EpicsRed[400],
                contrastText: EpicsRed.contrastText,
              },
              warning: {
                light: EpicsYellow[200],
                main: EpicsYellow[300],
                dark: EpicsYellow[400],
                contrastText: EpicsYellow.contrastText,
              },
              info: {
                light: EpicsBlue[100],
                main: EpicsBlue[200],
                dark: EpicsBlue[300],
                contrastText: EpicsBlue.contrastText,
              },
              success: {
                light: EpicsGreen[200],
                main: EpicsGreen[300],
                dark: EpicsGreen[400],
                contrastText: EpicsGreen.contrastText,
              },
              text: {
                primary: EpicsGrey[400],
                secondary: EpicsGrey[200],
              },
            }
          : {
              primary: {
                light: EpicsBlue[100],
                main: EpicsBlue[200],
                dark: EpicsBlue[300],
                contrastText: EpicsGrey[500],
              },
              secondary: {
                light: grey[50],
                main: grey[100],
                dark: grey[200],
                contrastText: EpicsGrey[500],
              },
              error: {
                light: EpicsRed[100],
                main: EpicsRed[200],
                dark: EpicsRed[300],
                contrastText: EpicsGrey[500],
              },
              warning: {
                light: EpicsYellow[100],
                main: EpicsYellow[200],
                dark: EpicsYellow[300],
                contrastText: EpicsGrey[500],
              },
              info: {
                light: EpicsBlue[100],
                main: EpicsBlue[200],
                dark: EpicsBlue[300],
                contrastText: EpicsGrey[500],
              },
              success: {
                light: EpicsGreen[100],
                main: EpicsGreen[200],
                dark: EpicsGreen[300],
                contrastText: EpicsGrey[500],
              },
            }),
      },
      typography: {
        fontFamily: `
          -apple-system,
          BlinkMacSystemFont,
          "Hiragino Sans" ,
          "Hiragino Kaku Gothic ProN",
          "Helvetica Neue",
          "Segoe UI",
          "BIZ UDPGothic",
          "Noto Sans",
          "Yu Gothic UI",
          Roboto,
          Arial,
          sans-serif,
          "Apple Color Emoji",
          "Noto Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol";`,
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
          fontWeight: 700,
          fontSize: '2.66667rem',
          letterSpacing: 'normal',
          lineHeight: 1.14286,
        },
        h2: {
          fontWeight: 700,
          fontSize: '2rem',
          letterSpacing: 'normal',
          lineHeight: 1.167,
        },
        h3: {
          fontWeight: 700,
          fontSize: '1.6rem',
          letterSpacing: 'normal',
          lineHeight: 1.2,
        },
        h4: {
          fontWeight: 700,
          fontSize: '1.33333rem',
          letterSpacing: 'normal',
          lineHeight: 1.235,
        },
        h5: {
          fontWeight: 700,
          fontSize: '1.14286rem',
          letterSpacing: 'normal',
          lineHeight: 1.33333,
        },
        h6: {
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: 'normal',
          lineHeight: 1.6,
        },
        subtitle1: {
          fontWeight: 500,
          fontSize: '1.33333rem',
          letterSpacing: 'normal',
          lineHeight: 1.33333,
        },
        subtitle2: {
          fontWeight: 500,
          fontSize: '1.14286rem',
          letterSpacing: 'normal',
          lineHeight: 1.6,
        },
        body1: {
          fontWeight: 500,
          fontSize: '1rem',
          letterSpacing: 'normal',
          lineHeight: 1.6,
        },
        body2: {
          fontWeight: 500,
          fontSize: '0.88889rem',
          letterSpacing: 'normal',
          lineHeight: 1.75,
        },
        button: {
          fontWeight: 700,
          fontSize: '0.88889rem',
          textTransform: 'none',
          letterSpacing: 'normal',
          lineHeight: 1.75,
        },
        caption: {
          fontWeight: 400,
          fontSize: '0.8rem',
          letterSpacing: 'normal',
          lineHeight: 1.14286,
        },
        overline: {
          fontWeight: 500,
          fontSize: '0.8rem',
          textTransform: 'none',
          letterSpacing: 'normal',
          lineHeight: 2.66667,
        },
      },
      shape: {
        borderRadius: 16,
      },
      shadows: [
        'none',
        'rgb(169 174 183 / 50%) 0px 1px 2px 0px',
        'rgb(169 174 183 / 50%) 0px 1.5px 3px 0px',
        'rgb(169 174 183 / 50%) 0px 2px 4px 0px',
        'rgb(169 174 183 / 50%) 0px 2.5px 5px 0px',
        'rgb(169 174 183 / 50%) 0px 3px 6px 0px',
        'rgb(169 174 183 / 50%) 0px 3.5px 7px 0px',
        'rgb(169 174 183 / 50%) 0px 4px 8px 0px',
        'rgb(169 174 183 / 50%) 0px 4.5px 9px 0px',
        'rgb(169 174 183 / 50%) 0px 5px 10px 0px',
        'rgb(169 174 183 / 50%) 0px 5.5px 11px 0px',
        'rgb(169 174 183 / 50%) 0px 6px 12px 0px',
        'rgb(169 174 183 / 50%) 0px 6.5px 13px 0px',
        'rgb(169 174 183 / 50%) 0px 7px 14px 0px',
        'rgb(169 174 183 / 50%) 0px 7.5px 15px 0px',
        'rgb(169 174 183 / 50%) 0px 8px 16px 0px',
        'rgb(169 174 183 / 50%) 0px 8.5px 17px 0px',
        'rgb(169 174 183 / 50%) 0px 9px 18px 0px',
        'rgb(169 174 183 / 50%) 0px 9.5px 19px 0px',
        'rgb(169 174 183 / 50%) 0px 10px 20px 0px',
        'rgb(169 174 183 / 50%) 0px 10.5px 21px 0px',
        'rgb(169 174 183 / 50%) 0px 11px 22px 0px',
        'rgb(169 174 183 / 50%) 0px 11.5px 23px 0px',
        'rgb(169 174 183 / 50%) 0px 12px 24px 0px',
        'rgb(169 174 183 / 50%) 0px 12.5px 25px 0px',
      ],
    },
    isEnglish ? enUS : jaJP
  )
