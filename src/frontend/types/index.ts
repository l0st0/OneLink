import {
  About as ICAbout,
  Controller as ICController,
  Link as ICLink,
  Look as ICLook,
  Name as ICName,
  NameData as ICNameData,
  Stats as ICStats,
  User as ICUser,
} from '@/names/main/types'

export type LiteralUnion<T extends U, U = {}> = T | (U & {})

export interface Response<T> {
  ok?: T
  err?: string
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  animate?: boolean
}

export interface Stats extends ICStats {}
export interface Name extends ICName {}
export interface User extends ICUser {}
export interface Link extends ICLink {}
export interface About extends ICAbout {}
export interface Look extends ICLook {}
export interface Controller extends ICController {}
export interface NameData extends ICNameData {}
