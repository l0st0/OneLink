import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { IconGrain } from '@tabler/icons'

export const LinkItemStyled = styled.div(
  ({ theme }) => css`
    display: flex;
    width: 100%;
    margin: ${theme.spaces[4]} 0;
    background: white;
    color: black;
    border-radius: ${theme.radius.normal};
  `
)

export const LinkItemHandle = styled.button(
  ({ theme }) => css`
    cursor: pointer;
    border: none;
    background: transparent;
    border-right: 1px solid ${theme.colors.gray};
    padding: ${theme.spaces[8]} ${theme.spaces[4]};
  `
)

export const HandleIcon = styled(IconGrain)(
  ({ theme }) => css`
    color: ${theme.colors.gray};
  `
)

export const LinkItemContent = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: ${theme.spaces[2]};
    padding: ${theme.spaces[2]} ${theme.spaces[4]};
  `
)
