import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { FontSizeTypes, FontWeightTypes } from '@/types'

export * from './TextInput'
export * from './TextArea'

interface DefaultInputProps {
  fontSize?: FontSizeTypes
  fontWeight?: FontWeightTypes
}

interface BasicTextAreaProps {
  resize?: 'horizontal' | 'vertical'
}

const defaultStyles = (theme: Theme) => {
  return css`
    width: 100%;

    border: none;
    font-size: ${theme.text.fontSize.base};
    font-weight: ${theme.text.fontWeight[400]};
    background: ${theme.colors.white};

    :focus {
      outline: none;
    }
  `
}

const basicStyles = (theme: Theme) => {
  return css`
    border-radius: ${theme.radius.normal};
    padding: ${theme.spaces[3.5]};

    :focus {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 4px;
    }
  `
}

export const DefaultInput = styled.input<DefaultInputProps>(({ theme }) => defaultStyles(theme))
export const BasicInput = styled(DefaultInput)(({ theme }) => basicStyles(theme))
export const DefaultTextArea = styled.textarea<DefaultInputProps>(({ theme }) => defaultStyles(theme))
export const BasicTextArea = styled(DefaultTextArea)<BasicTextAreaProps>(
  ({ theme, resize = 'vertical' }) =>
    css`
      resize: ${resize};
      height: ${theme.spaces[24]};

      ${basicStyles(theme)}
    `
)
