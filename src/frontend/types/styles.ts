import {
  BreakPointTypes,
  ColorTypes,
  FontSizeTypes,
  FontWeightTypes,
  SpaceTypes,
  WidthTypes,
} from './style.types'

export type Colors = {
  [Property in ColorTypes]: string
}

export type Spaces = {
  [Property in SpaceTypes]: string
}

export type FontSizes = {
  [Property in FontSizeTypes]: string
}

export type FontWeights = {
  [Property in FontWeightTypes]: number
}

export type Width = {
  [Property in WidthTypes]: string
}

// Theme
export interface CustomTheme {
  colors: Colors
  spaces: Spaces
  text: {
    fontSize: FontSizes
    fontWeight: FontWeights
  }
  width: Width
  radius: {
    low: string
    normal: string
    large: string
  }
}

// Utils
export type MapMqValueTypes<T> = string | { [Property in BreakPointTypes]?: T }

export interface MapMqProps<T> {
  name: string[]
  value?: MapMqValueTypes<T>
  unit?: string
  theme?: any
}

// CSS
type FlexDirectionTypes = 'row' | 'column' | 'column-reverse' | 'row-reverse'
type AlignItemsTypes = 'center' | 'flex-end' | 'flex-start'
type JustifyContentTypes = 'center' | 'flex-end' | 'flex-start' | 'space-between' | 'space-around'

type SpaceMqTypes = {
  [Property in BreakPointTypes]?: SpaceTypes
}

export type SpaceUnits = SpaceTypes | SpaceMqTypes

type FlexDirectionMqTypes = {
  [Property in BreakPointTypes]?: FlexDirectionTypes
}
export type FlexDirection = FlexDirectionTypes | FlexDirectionMqTypes

type AlignItemsMqTypes = {
  [Property in BreakPointTypes]?: AlignItemsTypes
}
export type AlignItems = AlignItemsTypes | AlignItemsMqTypes

type JustifyContentMqTypes = {
  [Property in BreakPointTypes]?: JustifyContentTypes
}
export type JustifyContent = JustifyContentTypes | JustifyContentMqTypes
