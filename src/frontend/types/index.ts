import { Name as ICName } from '@/names/main/types'

export * from './styles'
export * from './style.types'

export type LiteralUnion<T extends U, U = {}> = T | (U & {})

export interface Response<T> {
  ok?: T
  err?: string
}

export interface IconProps {
  width?: number | string
  height?: number | string
}

export interface Name extends ICName {}
