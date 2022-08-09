import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

export const Button = styled.button<ButtonProps>(
  ({ theme }) => css`
    text-transform: uppercase;
    padding: ${theme.spaces[4]} ${theme.spaces[8]};
    border-radius: ${theme.radius.normal};
    border: 2px solid ${theme.colors.primary};
    font-size: ${theme.text.fontSize.base};
    cursor: pointer;
  `
)

export const OutlineButton = styled(Button)(
  ({ theme, variant = 'primary' }) => css`
    background: transparent;
    border: 2px solid ${theme.colors.primary};

    ${variant === 'primary'
      ? css`
          color: ${theme.colors.primary};
        `
      : css`
          color: ${theme.colors.secondary};
        `}
  `
)

export const FillButton = styled(Button)(
  ({ theme, variant = 'primary' }) => css`
    color: ${theme.colors.white};

    ${variant === 'primary'
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
