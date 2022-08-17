import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const IconLinkButton = styled.div<{ active: boolean }>(
  ({ theme, active }) => css`
    color: ${active ? theme.colors.white : theme.colors.black};
    background: ${active ? theme.colors.secondary : 'transparent'};
    padding: ${theme.spaces[2.5]} ${theme.spaces[6]};
    padding-top: ${theme.spaces[3.5]};
    border-radius: ${theme.radius.normal};

    :hover {
      background: ${theme.colors.secondary};
      color: ${theme.colors.white};

      svg {
        stroke-width: 1;
      }
    }

    svg {
      stroke-width: ${active ? 1 : 2};
    }
  `
)
