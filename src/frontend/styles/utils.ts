import isString from 'lodash/isString'
import { css } from '@emotion/react'
import { BreakPointTypes, MapMqProps, SpacePropTypes } from '@/types'

export const spaceProps: { name: string[]; value: SpacePropTypes }[] = [
  { name: ['gap'], value: 'gap' },
  { name: ['marginTop'], value: 'mt' },
  { name: ['marginBottom'], value: 'mb' },
  { name: ['marginLeft'], value: 'ml' },
  { name: ['marginRight'], value: 'mr' },
  { name: ['margin'], value: 'm' },
  { name: ['marginTop', 'marginBottom'], value: 'my' },
  { name: ['marginLeft', 'marginRight'], value: 'mx' },
]

export const breakpointsArr: BreakPointTypes[] = ['_', 'sm', 'md', 'lg', 'xl']

const breakpointsObj = {
  _: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

export const mq = (bp: BreakPointTypes) => {
  return `@media (min-width: ${breakpointsObj[bp]})`
}

type getCssType = { [key: string]: string }
type mediaType = { [key: string]: {} }

export const mapMq = <T extends {}>({ name, value, theme = undefined }: MapMqProps<T>) => {
  if (!value) return css``

  const media: mediaType = {}

  if (isString(value)) {
    let getCss: getCssType = {}
    name.map((n) => (getCss[n] = `${value}`))

    if (value.includes('px') || value.includes('rem')) return css(getCss)

    if (theme) {
      getCss = {}
      name.map((n) => (getCss[n] = `${theme[value]}`))
      return css(getCss)
    }

    return css(getCss)
  }

  breakpointsArr.map((bpName) => {
    let val = value[bpName]

    if (val) {
      if (theme) val = theme[value[bpName]]
      if (String(value[bpName]).includes('px') || String(value[bpName]).includes('rem')) val = value[bpName]

      if (bpName === '_') return name.map((n) => (media[n] = `${val}`))
      return name.map((n) => (media[mq(bpName)] = { ...media[mq(bpName)], [n]: `${val}` }))
    }
  })

  return css(media)
}
