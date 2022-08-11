import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface TopBarProps {
  visual?: 'light' | 'dark'
}

export const TopBar = styled.div<TopBarProps>(
  ({ theme, visual = 'light' }) => css`
    background: ${visual === 'light' ? theme.colors.white : theme.colors.secondary};
    color: ${visual === 'light' ? theme.colors.black : theme.colors.white};
    border-radius: ${theme.radius.normal};
    padding: ${theme.spaces[2]} ${theme.spaces[6]};
  `
)

export const SideBar = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: ${theme.spaces[8]} ${theme.spaces[2]};
    height: 100%;
    width: 100%;
  `
)
