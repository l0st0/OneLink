import styled from '@emotion/styled'
import { mapMq, spaceProps } from '@/styles'
import { AlignItems, FlexDirection, LiteralUnion, SpacePropTypes, SpaceUnits } from '@/types'
import { css } from '@emotion/react'

type FlexProps = {
  flexDirection?: FlexDirection
  alignItems?: AlignItems
  textAlign?: 'center' | 'left' | 'right'
} & {
  [Property in SpacePropTypes]?: LiteralUnion<SpaceUnits>
}

export const Flex = styled.div<FlexProps>(
  ({ theme, flexDirection = 'row', alignItems = 'flex-start', ...rest }) => css`
    display: flex;

    ${mapMq({ name: 'flexDirection', value: flexDirection })}
    ${mapMq({ name: 'alignItems', value: alignItems })}

    ${spaceProps.map(
      ({ name, value }) =>
        css`
          ${mapMq({ name, value: rest[value], theme: theme.spaces })}
        `
    )}
  `
)
