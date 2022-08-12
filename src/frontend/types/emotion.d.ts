import '@emotion/react'
import { CustomTheme } from '@/types'

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
