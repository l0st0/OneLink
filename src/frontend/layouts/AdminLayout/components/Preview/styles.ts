import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const PreviewContainer = styled.div(
  ({ theme }) => css`
    position: relative;
    background: ${theme.colors.white};
    padding: ${theme.spaces[8]};
  `
)

export const PreviewTop = styled.div(
  ({ theme }) => css`
    position: sticky;
    top: ${theme.spaces[6]};

    z-index: 100;
  `
)
