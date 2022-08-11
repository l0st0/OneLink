import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const TopBar = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border-radius: ${theme.radius.normal};
    padding: ${theme.spaces[2]} ${theme.spaces[4]};
  `
)

export const SideBar = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: ${theme.spaces[6]} ${theme.spaces[2]};
    height: 100%;
    width: 100%;
  `
)
