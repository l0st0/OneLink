import React from 'react'
import { ButtonProps, FilledButton, OutlineButton } from '.'
import { Flex } from '../flex'
import { Spinner } from '../spinner'

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    button?: 'outline' | 'filled'
    loading: boolean
  }

export const LoadingButton = ({
  button = 'filled',
  color = 'primary',
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
    <ButtonEl color={color} disabled={disabled || loading} {...rest}>
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
