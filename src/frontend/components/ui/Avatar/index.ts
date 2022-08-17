import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const AvatarText = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    color: ${theme.colors.black};
    background: ${theme.colors.white};
    font-size: ${theme.text.fontSize['4xl']};
    font-weight: ${theme.text.fontWeight[700]};

    width: 100px;
    height: 100px;
    border-radius: 100%;
  `
)

export const AvatarImage = styled.img(
  () => css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
  `
)
