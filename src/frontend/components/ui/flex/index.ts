import styled from '@emotion/styled'
import { mapMq } from '@/styles'
import { AlignItems, CustomGap, FlexDirection, Gap } from '@/types'

interface FlexProps {
  flexDirection?: FlexDirection
  gap?: Gap
  customGap?: CustomGap
  alignItems?: AlignItems
  textAlign?: 'center' | 'left' | 'right'
}

export const Flex = styled.div<FlexProps>`
  display: flex;

  ${({ flexDirection = 'row' }) => mapMq({ name: 'flexDirection', value: flexDirection })}
  ${({ alignItems = 'flex-start' }) => mapMq({ name: 'alignItems', value: alignItems })}
  ${({ theme, gap }) => mapMq<Gap>({ name: 'gap', value: gap, theme: theme.sizes })}
  ${({ customGap }) => mapMq({ name: 'gap', value: customGap })}
`
