import {
  Name as ICName,
  User as ICUser,
  Link as ICLink,
  Controller as ICController,
  Look as ICLook,
  Profile as ICProfile,
} from '@/names/main/types'

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
  spin?: boolean
}

export interface Name extends ICName {}
export interface User extends ICUser {}
export interface Link extends ICLink {}
export interface Controller extends ICController {}
export interface Look extends ICLook {}
export interface Profile extends ICProfile {}
