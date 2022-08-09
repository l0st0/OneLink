import { ColorTypes, FontSizeTypes } from '@/types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface TextProps {
  color?: ColorTypes
  fontSize?: FontSizeTypes
  strokeColor?: ColorTypes
  strokeWidth?: string
}

export const Heading = styled.h1<TextProps>(
  ({ theme, color = 'white', fontSize = '9xl', strokeColor, strokeWidth = '1px' }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.text.fontSize[fontSize]};

    ${strokeColor &&
    `
      -webkit-text-stroke: ${strokeWidth} ${theme.colors[strokeColor]};
    `}
  `
)

export const SubHeading = styled.p<TextProps>(
  ({ theme, color = 'white', fontSize = '4xl' }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.text.fontSize[fontSize]};
  `
)

export const Paragraph = styled.p<TextProps>(
  ({ theme, color = 'white' }) =>
    css`
      color: ${theme.colors[color]};
    `
)
