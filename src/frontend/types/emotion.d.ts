import { CustomTheme } from '@/types'
import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
