import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ColorTypes } from '@/types'

export * from './LoadingButton'

export interface ButtonProps {
  color?: ColorTypes
  fullSize?: boolean
  textTransform?: 'uppercase' | 'lowercase' | 'none'
}

export const ClearButton = styled.button<ButtonProps>(
  () => css`
    cursor: pointer;
    border: none;
    background: transparent;

    :disabled {
      cursor: default;
    }
  `
)

export const Button = styled(ClearButton)(
  ({ theme }) => css`
    border-radius: ${theme.radius.normal};
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

export const IconButton = styled(ClearButton)(
  ({ theme, color = 'black' }) => css`
    svg {
      stroke-width: 1;
      color: ${theme.colors[color]};
    }
  `
)
