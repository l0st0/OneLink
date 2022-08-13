import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { mapMq, spaceProps } from '@/styles'
import { AlignItems, FlexDirection, JustifyContent, LiteralUnion, SpacePropTypes, SpaceUnits } from '@/types'

type FlexProps = {
  direction?: FlexDirection
  align?: AlignItems
  justify?: JustifyContent
  textAlign?: 'center' | 'left' | 'right'
  height?: string
  width?: string
} & {
  [Property in SpacePropTypes]?: LiteralUnion<SpaceUnits>
}

export const Flex = styled.div<FlexProps>(
  ({ theme, direction = 'row', align = 'flex-start', justify = 'flex-start', height, width, ...rest }) => css`
    display: flex;
    height: ${height};
    width: ${width};

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
