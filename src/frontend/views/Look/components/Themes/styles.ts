import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { mqCustom } from '@/styles'

export const ThemeCardContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    padding: ${theme.spaces[4]} 0;
    border-radius: ${theme.radius.normal};
    gap: ${theme.spaces[6]};

    ${mqCustom(1040)} {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    }
  `
)

export const ThemeCardButton = styled.button<{ active: boolean }>(
  ({ theme, active }) => css`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 200px;
    background: transparent;
    color: white;
    border: 1px ${active ? 'dashed' : 'solid'} ${active ? theme.colors.secondary : theme.colors.white};
    border-radius: ${theme.radius.normal};

    :hover {
      border: 1px dashed ${theme.colors.secondary};
      outline: 2px solid ${theme.colors.primary};
      outline-offset: ${theme.spaces[1]};
    }

    ${active &&
    css`
      outline: 2px solid ${theme.colors.primary};
      outline-offset: ${theme.spaces[1]};
    `}
  `
)

export const ThemeCardButtonContent = styled.span(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    font-size: ${theme.text.fontSize['xl']};
    font-weight: ${theme.text.fontWeight['600']};
    padding: ${theme.spaces[2]};
  `
)
