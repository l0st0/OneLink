import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const AdminContainer = styled.div(
  () => css`
    position: relative;
  `
)

export const SideBarContainer = styled.div(
  ({ theme }) => css`
    position: sticky;
    height: 100vh;
    width: ${theme.spaces[20]};
    top: 0;
    left: 0;

    z-index: 100;
  `
)
