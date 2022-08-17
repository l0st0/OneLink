import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ColorTypes } from '@/types'

interface NameTextInputContainerProps {
  borderColor: ColorTypes
  maxWidth: string
}

export const NameTextInputContainer = styled.div<NameTextInputContainerProps>(
  ({ theme, borderColor, maxWidth }) => css`
    display: flex;
    background: ${theme.colors.white};
    border-radius: ${theme.radius.normal};
    padding: ${theme.spaces[3.5]};
    border: ${theme.spaces['0.5']} solid ${theme.colors.white};

    max-width: ${maxWidth};

    transition: all cubic-bezier(0, 0, 0.2, 1) 0.15s;

    :focus-within {
      outline: 2px solid ${theme.colors[borderColor]};
      outline-offset: 4px;
    }

    ${(borderColor === 'success' || borderColor === 'error') &&
    css`
      outline: 2px solid ${theme.colors[borderColor]};
      outline-offset: 4px;
    `}
  `
)

export const StartText = styled.p(
  ({ theme }) => css`
    color: ${theme.colors.black};
    cursor: default;
  `
)
