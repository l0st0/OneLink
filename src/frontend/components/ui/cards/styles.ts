import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const CardContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${theme.spaces[6]};
    width: 100%;
    height: 100%;
    padding: ${theme.spaces[4]};
    border: 2px solid ${theme.colors.white};
    border-radius: ${theme.radius.normal};
  `
)

export const CardTitle = styled.div(
  ({ theme }) => css`
    display: flex;
    width: 100%;
    font-size: ${theme.text.fontSize['2xl']};
  `
)
