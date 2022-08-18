import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ColorTypes, FontSizeTypes, FontWeightTypes } from '@/types'

interface TextProps {
  color?: ColorTypes
  fontSize?: FontSizeTypes
  fontWeight?: FontWeightTypes
  strokeColor?: ColorTypes
  strokeWidth?: string
}

export const H1 = styled.h1<TextProps>(
  ({
    theme,
    color = 'white',
    fontSize = '10xl',
    fontWeight = '600',
    strokeColor,
    strokeWidth = '1px',
  }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.text.fontSize[fontSize]};
    font-weight: ${theme.text.fontWeight[fontWeight]};

    ${strokeColor &&
    `
      -webkit-text-stroke: ${strokeWidth} ${theme.colors[strokeColor]};
    `}
  `
)

export const H2 = styled.h2<TextProps>(
  ({ theme, color = 'white', fontSize = '8xl', fontWeight = '600' }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.text.fontSize[fontSize]};
    font-weight: ${theme.text.fontWeight[fontWeight]};
  `
)

export const H3 = styled.h2<TextProps>(
  ({ theme, color = 'white', fontSize = '6xl', fontWeight = '600' }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.text.fontSize[fontSize]};
    font-weight: ${theme.text.fontWeight[fontWeight]};
  `
)

export const H6 = styled.h2<TextProps>(
  ({ theme, color = 'white', fontSize = '2xl', fontWeight = '600' }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.text.fontSize[fontSize]};
    font-weight: ${theme.text.fontWeight[fontWeight]};
  `
)

export const SubH1 = styled.p<TextProps>(
  ({ theme, color = 'white', fontSize = '3xl', fontWeight = '300' }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.text.fontSize[fontSize]};
    font-weight: ${theme.text.fontWeight[fontWeight]};
  `
)

export const SubH2 = styled.p<TextProps>(
  ({ theme, color = 'white', fontSize = 'xl', fontWeight = '200' }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.text.fontSize[fontSize]};
    font-weight: ${theme.text.fontWeight[fontWeight]};
  `
)

export const Paragraph = styled.p<TextProps>(
  ({ theme, color = 'white', fontSize = 'base', fontWeight = '400' }) =>
    css`
      color: ${theme.colors[color]};
      font-size: ${theme.text.fontSize[fontSize]};
      font-weight: ${theme.text.fontWeight[fontWeight]};
    `
)
