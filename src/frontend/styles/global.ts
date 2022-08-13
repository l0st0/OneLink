import { css } from '@emotion/react'
import { theme } from './theme'

export const globalStyles = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: 'Raleway', sans-serif;

    ::-webkit-scrollbar {
      width: ${theme.spaces[2]};
    }

    ::-webkit-scrollbar-track {
      background: ${theme.colors.white};
      border-radius: ${theme.spaces[1]};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.primary};
      border-radius: ${theme.spaces[1]};
    }
  }

  html {
    min-height: 100%;
  }

  body {
    background: linear-gradient(135deg, rgba(100, 160, 250, 1) -200%, black 50%, rgba(30, 50, 100, 1) 200%);
    color: white;
  }
`
