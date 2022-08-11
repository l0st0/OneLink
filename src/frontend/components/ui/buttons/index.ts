import { css } from '@emotion/react'
import styled from '@emotion/styled'

export * from './LoadingButton'

export interface ButtonProps {
  color?: 'primary' | 'secondary' | 'white'
  fullSize?: boolean
  textTransform?: 'uppercase' | 'lowercase' | 'none'
}

const Button = styled.button<ButtonProps>(
  ({ theme }) => css`
    cursor: pointer;
    border-radius: ${theme.radius.normal};

    :disabled {
      cursor: default;
    }
  `
)

export const TextButton = styled(Button)(
  ({ theme, fullSize, color = 'white', textTransform = 'uppercase' }) => css`
    text-transform: ${textTransform};
    padding: ${theme.spaces[4]} ${theme.spaces[6]};
    font-size: ${theme.text.fontSize.sm};
    font-weight: ${theme.text.fontWeight[500]};
    letter-spacing: ${theme.spaces.px};
    background: transparent;
    border: 2px solid transparent;
    color: ${theme.colors[color]};

    ${fullSize &&
    css`
      width: 100%;
    `};
  `
)

export const OutlineButton = styled(TextButton)(
  ({ theme, color = 'primary' }) => css`
    background: transparent;
    border: 2px solid ${theme.colors.primary};

    ${color === 'primary'
      ? css`
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
        `
      : css`
          color: ${theme.colors.secondary};
          border: 2px solid ${theme.colors.secondary};
        `}
  `
)

export const FilledButton = styled(TextButton)(
  ({ theme, color = 'primary' }) => css`
    color: ${theme.colors.white};

    ${color === 'primary'
      ? css`
          background: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
        `
      : css`
          background: ${theme.colors.secondary};
          border: 2px solid ${theme.colors.secondary};
        `}
  `
)
