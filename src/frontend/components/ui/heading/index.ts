import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface TextProps {
  color?: 'white' | 'black'
  fontSize?: 12 | 14 | 16 | 20 | 24 | 30
}

export const Heading = styled.h1<TextProps>`
  color: ${(p) => p.color || 'white'};

  ${(p) =>
    p.fontSize &&
    css`
      font-size: ${p.fontSize}px}
    `}
`

export const Paragraph = styled.p<TextProps>`
  color: ${(p) => p.color || 'white'};

  ${(p) =>
    p.fontSize &&
    css`
      font-size: ${p.fontSize}px}
    `}
`
