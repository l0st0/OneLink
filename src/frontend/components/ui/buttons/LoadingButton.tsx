import React from 'react'
import { ButtonProps, FilledButton, OutlineButton } from '.'
import { Flex } from '../Flex'
import { Spinner } from '../Spinner'

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
    <ButtonEl
      color={color}
      disabled={disabled || loading}
      {...rest}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {loading ? (
        <Flex gap="2">
          <Spinner />
        </Flex>
      ) : (
        children
      )}
    </ButtonEl>
  )
}
