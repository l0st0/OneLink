import _ from 'lodash'
import { css } from '@emotion/react'
import { BreakPointNames, MapMqProps } from '@/types'

export const breakpointsArr: BreakPointNames[] = ['_', 'sm', 'md', 'lg', 'xl']

const breakpointsObj = {
  _: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

export const mq = (bp: BreakPointNames) => {
  return `@media (min-width: ${breakpointsObj[bp]})`
}

export const mapMq = <T extends {}>({ name, value, theme = undefined }: MapMqProps<T>) => {
  if (!value) return css``
  if (_.isString(value)) {
    if (theme)
      return css({
        [name]: `${theme[value]}`,
      })

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
