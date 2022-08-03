import { Theme } from '@emotion/react'

// Theme
type SizeTypes = '0' | '1' | '2' | '3' | '4' | '5'
export interface Sizes {
  '0': string
  '1': string
  '2': string
  '3': string
  '4': string
  '5': string
}

export interface CustomTheme {
  sizes: Sizes
  width: {
    max: number
    full: number
  }
}

// Utils
export type BreakPointNames = '_' | 'sm' | 'md' | 'lg' | 'xl'

export type MapMqValueTypes<T> = string | { _: T; sm?: T; md?: T; lg?: T; xl?: T }

export interface MapMqProps<T> {
  name: string
  value?: MapMqValueTypes<T>
  unit?: string
  theme?: any
}

// CSS
type FlexDirectionTypes = 'row' | 'column' | 'column-reverse' | 'row-reverse'
type FlexDirectionMqTypes = {
  _: FlexDirectionTypes
  sm?: FlexDirectionTypes
  md?: FlexDirectionTypes
  lg?: FlexDirectionTypes
  xl?: FlexDirectionTypes
}
export type FlexDirection = FlexDirectionTypes | FlexDirectionMqTypes

type AlignItemsTypes = 'center' | 'flex-end' | 'flex-start'
type AlignItemsMqTypes = {
  _: AlignItemsTypes
  sm?: AlignItemsTypes
  md?: AlignItemsTypes
  lg?: AlignItemsTypes
  xl?: AlignItemsTypes
}
export type AlignItems = AlignItemsTypes | AlignItemsMqTypes

type GapMqTypes = {
  _: SizeTypes
  sm?: SizeTypes
  md?: SizeTypes
  lg?: SizeTypes
  xl?: SizeTypes
}
export type Gap = SizeTypes | GapMqTypes

type CustomGapMqTypes = {
  _: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}
export type CustomGap = string | CustomGapMqTypes
