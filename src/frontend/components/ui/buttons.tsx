import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Flex } from './flex'
import { Spinner } from './spinner'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  fullSize?: boolean
}

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    button?: 'outline' | 'filled'
    loading: boolean
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

const TextButton = styled(Button)(
  ({ theme, fullSize }) => css`
    text-transform: uppercase;
    padding: ${theme.spaces[4]} ${theme.spaces[6]};
    font-size: ${theme.text.fontSize.sm};
    font-weight: ${theme.text.fontWeight[500]};
    letter-spacing: ${theme.spaces.px};

    ${fullSize &&
    css`
      width: 100%;
    `}
  `
)

export const OutlineButton = styled(TextButton)(
  ({ theme, variant = 'primary' }) => css`
    background: transparent;
    border: 2px solid ${theme.colors.primary};

    ${variant === 'primary'
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

export const LoadingButton = ({
  button = 'filled',
  variant = 'primary',
  loading,
  disabled,
  children,
  ...rest
}: LoadingButtonProps) => {
  const getElement = () => {
    if (button === 'filled') return FilledButton
    return OutlineButton
  }

  const ButtonEl = getElement()

  return (
    <ButtonEl variant={variant} disabled={disabled || loading} {...rest}>
      {loading ? (
        <Flex gap="2">
          <Spinner /> {children}
        </Flex>
      ) : (
        children
      )}
    </ButtonEl>
  )
}
