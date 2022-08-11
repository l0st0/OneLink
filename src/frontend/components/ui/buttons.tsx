import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Flex } from './flex'
import { Spinner } from './spinner'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    button?: 'outline' | 'filled'
    loading: boolean
  }

export const Button = styled.button<ButtonProps>(
  ({ theme }) => css`
    cursor: pointer;
    text-transform: uppercase;
    padding: ${theme.spaces[4]} ${theme.spaces[6]};
    border-radius: ${theme.radius.normal};
    border: ${theme.spaces['0.5']} solid ${theme.colors.primary};
    font-size: ${theme.text.fontSize.sm};
    font-weight: ${theme.text.fontWeight[500]};
    letter-spacing: ${theme.spaces.px};

    :disabled {
      /* color: ${theme.colors.disable}; */
      /* border-color: ${theme.colors.disable}; */
      cursor: default;
    }
  `
)

export const OutlineButton = styled(Button)(
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

export const FilledButton = styled(Button)(
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
  children,
  ...rest
}: LoadingButtonProps) => {
  const getElement = () => {
    if (button === 'filled') return FilledButton
    return OutlineButton
  }

  const ButtonEl = getElement()

  return (
    <ButtonEl variant={variant} disabled={loading} {...rest}>
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
