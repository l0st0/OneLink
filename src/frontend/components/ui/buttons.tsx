import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Spinner } from './Spinner'

interface ButtonProps extends React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  color?: 'primary' | 'secondary'
}

interface LoadingButtonProps extends ButtonProps {
  button?: 'filled' | 'outline' | 'text'
  loading: boolean
}

interface ColorButtonProps extends ButtonProps {
  active?: boolean
}

export const FilledButton = ({ children, className, color, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={twMerge(
      clsx(
        [
          'border-transparent text-white',
          { 'bg-primary': color === 'primary', 'bg-secondary': color === 'secondary' },
        ],
        className
      )
    )}
  >
    {children}
  </button>
)

export const OutlineButton = ({ children, className, color, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={twMerge(
      clsx(
        [
          'bg-transparent text-primary',
          { 'border-primary': color === 'primary', 'border-secondary': color === 'secondary' },
        ],
        className
      )
    )}
  >
    {children}
  </button>
)

export const TextButton = ({ children, className, color, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={twMerge(clsx(['normal-case text-white', 'border border-transparent'], className))}
  >
    {children}
  </button>
)

export const IconButton = ({ children, className, color, ...rest }: ButtonProps) => (
  <button {...rest} className={twMerge(clsx(['p-0 text-white', 'border border-transparent'], className))}>
    {children}
  </button>
)

export const ColorButton = ({ children, className, active, ...rest }: ColorButtonProps) => (
  <button
    {...rest}
    className={twMerge(
      clsx(
        [
          'w-full p-3 text-white',
          'border-dashed border-white',
          active ? 'ring ring-primary ring-offset-4 ring-offset-black' : 'ring-0',
        ],
        className
      )
    )}
  >
    {children}
  </button>
)

export const LoadingButton = ({
  button,
  color = 'primary',
  loading,
  disabled,
  children,
  ...rest
}: LoadingButtonProps) => {
  const getElement = () => {
    if (button === 'filled') return FilledButton
    if (button === 'outline') return OutlineButton
    if (button === 'text') return TextButton
    return FilledButton
  }

  const ButtonEl = getElement()

  return (
    <ButtonEl
      color={color}
      disabled={disabled || loading}
      {...rest}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {loading ? <Spinner /> : children}
    </ButtonEl>
  )
}
