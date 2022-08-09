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
    padding: ${theme.spaces[4]};

    max-width: 250px;

    transition: all step-end 0.2s;

    border: 2px solid ${theme.colors[borderColor]};
    box-shadow: 0 0 0 2px ${theme.colors.white};
  `
)

export const StartText = styled.p(
  ({ theme }) => css`
    color: ${theme.colors.black};
    cursor: default;
  `
)

export const InputText = styled(TextInput)(
  () => css`
    border: none;

    :focus {
      outline: none;
    }
  `
)
