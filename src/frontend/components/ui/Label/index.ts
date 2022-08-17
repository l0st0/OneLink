import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Label = styled.label(
  ({ theme }) => css`
    font-size: ${theme.text.fontSize.base};
    font-weight: ${theme.text.fontWeight[600]};
    padding: ${theme.spaces[2.5]} ${theme.spaces[1]};
    letter-spacing: 1px;
  `
)
