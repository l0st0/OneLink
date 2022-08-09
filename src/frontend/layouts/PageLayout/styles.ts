import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const PageContainer = styled.div(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    max-width: ${theme.width.max};
    margin: 0 auto;
    padding: 0 ${theme.spaces[5]};
  `
)

export const TopBarContainer = styled.div(
  ({ theme }) => css`
    position: sticky;
    top: ${theme.spaces[5]};
    right: 0;
    z-index: 100;

    margin: ${theme.spaces[5]} 0;
  `
)
