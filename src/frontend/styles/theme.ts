import { css, Theme } from '@emotion/react'

export const globalStyles = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Raleway', sans-serif;
  }
`

export const theme: Theme = {
  sizes: {
    '0': '0px',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '24px',
  },

  width: {
    max: 1440,
    full: 1920,
  },
}
