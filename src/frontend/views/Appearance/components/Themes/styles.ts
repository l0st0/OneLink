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
    gap: ${theme.spaces[4]};

    ${mqCustom(1040)} {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    }
  `
)

export const ThemeCardButton = styled.button(
  ({ theme }) => css`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 200px;
    background: transparent;
    color: white;
    border: 1px solid ${theme.colors.white};
    border-radius: ${theme.radius.normal};
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
