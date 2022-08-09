import _ from 'lodash'
import { css } from '@emotion/react'
import { BreakPointTypes, MapMqProps, SpacePropTypes } from '@/types'

export const spaceProps: { name: string; value: SpacePropTypes }[] = [
  { name: 'gap', value: 'gap' },
  { name: 'marginTop', value: 'mt' },
  { name: 'marginBottom', value: 'mb' },
  { name: 'marginLeft', value: 'ml' },
  { name: 'marginRight', value: 'mr' },
  { name: 'margin', value: 'm' },
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

export const mapMq = <T extends {}>({ name, value, theme = undefined }: MapMqProps<T>) => {
  if (!value) return css``
  if (_.isString(value)) {
    if (theme) {
      if (value.includes('px') || value.includes('rem')) {
        return css({
          [name]: `${value}`,
        })
      }

      return css({
        [name]: `${theme[value]}`,
      })
    }

    return css({
      [name]: `${value}`,
    })
  }

  const media: { [key: string]: {} } = {}

  breakpointsArr.map((bpName) => {
    if (value[bpName]) {
      let val = value[bpName]
      if (theme) val = theme[value[bpName]]
      if (bpName === '_') return (media[name] = `${val}`)

      return (media[mq(bpName)] = { [name]: `${val}` })
    }
  })

  return css({
    ...media,
  })
}
