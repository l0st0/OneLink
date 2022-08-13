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
    padding-left: ${theme.spaces[2.5]};
    cursor: grab;
  `
)

export const HandleIcon = styled(IconGrain)(
  ({ theme }) => css`
    color: ${theme.colors.gray};
    width: 16px;
  `
)

export const LinkItemContent = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${theme.spaces[4]};
    padding: ${theme.spaces[4]};
  `
)
