import styled from '@emotion/styled'
import { mapMq, spaceProps } from '@/styles'
import { AlignItems, FlexDirection, JustifyContent, LiteralUnion, SpacePropTypes, SpaceUnits } from '@/types'
import { css } from '@emotion/react'

type FlexProps = {
  direction?: FlexDirection
  align?: AlignItems
  justify?: JustifyContent
  textAlign?: 'center' | 'left' | 'right'
} & {
  [Property in SpacePropTypes]?: LiteralUnion<SpaceUnits>
}

export const Flex = styled.div<FlexProps>(
  ({ theme, direction = 'row', align = 'flex-start', justify = 'flex-start', ...rest }) => css`
    display: flex;
    height: 100%;

    ${mapMq({ name: ['flexDirection'], value: direction })}
    ${mapMq({ name: ['alignItems'], value: align })}
    ${mapMq({ name: ['justifyContent'], value: justify })}

    ${spaceProps.map(
      ({ name, value }) =>
        css`
          ${mapMq({ name, value: rest[value], theme: theme.spaces })}
        `
    )}
  `
)
