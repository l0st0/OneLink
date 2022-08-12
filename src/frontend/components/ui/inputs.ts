import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FontSizeTypes, FontWeightTypes } from '@/types'

interface TextInputProps {
  fontSize?: FontSizeTypes
  fontWeight?: FontWeightTypes
}

export const TextInput = styled.input<TextInputProps>(
  ({ theme, fontSize = 'base', fontWeight = '300' }) => css`
    width: 100%;
    background: ${theme.colors.white};
    font-size: ${theme.text.fontSize[fontSize]};
    font-weight: ${theme.text.fontWeight[fontWeight]};
  `
)
