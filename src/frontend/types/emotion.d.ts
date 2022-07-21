import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      primary: {
        main: string
      }
      secondary: {
        main: string
      }
      background: {
        default: string
      }
    }
    shape: {
      borderRadius: string | number
    }
    gradient: {
      primary: string
      secondary: string
    }
    container: {
      max: number
    }
  }
}
