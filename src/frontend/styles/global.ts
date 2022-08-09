import { css } from '@emotion/react'

export const globalStyles = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: 'Raleway', sans-serif;
  }

  html {
    min-height: 100%;
  }

  body {
    background: linear-gradient(135deg, rgba(100, 160, 250, 1) -200%, black 50%, rgba(30, 50, 100, 1) 200%);
    color: white;
  }
`
