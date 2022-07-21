import { css, Theme } from '@emotion/react'

export const globalStyles = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  h1 {
    font-size: 120px;
  }

  h2 {
    font-size: 100px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1;
  }
`

export const theme: Theme = {
  palette: {
    primary: {
      main: '#29ABE2',
    },
    secondary: {
      main: '#ED1E79',
    },
    background: {
      default: '#171717',
    },
  },
  shape: {
    borderRadius: '14px',
  },
  gradient: {
    primary: `linear-gradient(to right, #5c2784, #29ABE2)`,
    secondary: `linear-gradient(to right, #5c2784, #ED1E79)`,
  },
  container: {
    max: 1440,
  },
}
