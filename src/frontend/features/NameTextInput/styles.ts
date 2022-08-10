import { TextInput } from '@/components'
import { ColorTypes } from '@/types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface NameTextInputContainerProps {
  borderColor: ColorTypes
}

export const NameTextInputContainer = styled.div<NameTextInputContainerProps>(
  ({ theme, borderColor }) => css`
    display: flex;
    background: ${theme.colors.white};
    border-radius: ${theme.radius.normal};
    padding: ${theme.spaces[3.5]};
    border: ${theme.spaces['0.5']} solid ${theme.colors.white};

    max-width: 250px;

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

export const InputText = styled(TextInput)`
  border: none;

  :focus {
    outline: none;
  }
`
