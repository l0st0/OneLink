import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getBrightness, rgbFromString } from '@/utils'
import { Spinner } from '.'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary'
}

interface LoadingButtonProps extends ButtonProps {
  button?: 'solid' | 'outline' | 'text'
  loading: boolean
}

export interface ColorButtonProps extends ButtonProps {
  active?: boolean
  gradient?: {
    position: 'top' | 'bottom'
    bgColor: string
    gradientColor: string
  }
}

export const SolidButton = ({ children, className, color = 'primary', ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={twMerge(
      clsx({ 'bg-primary': color === 'primary', 'bg-secondary': color === 'secondary' }, className)
    )}
  >
    {children}
  </button>
)

export const OutlineButton = ({ children, className, color = 'primary', ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={twMerge(
      clsx(
        'bg-transparent text-primary',
        color === 'primary' && 'border-primary',
        color === 'secondary' && 'border-secondary',
        className
      )
    )}
  >
    {children}
  </button>
)

export const TextButton = ({ children, className, ...rest }: ButtonProps) => (
  <button {...rest} className={twMerge(clsx(className))}>
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
    if (button === 'solid') return SolidButton
    if (button === 'outline') return OutlineButton
    if (button === 'text') return TextButton
    return SolidButton
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

export const IconButton = ({ children, className, ...rest }: ButtonProps) => (
  <button {...rest} className={twMerge(clsx('p-0', className))}>
    {children}
  </button>
)

export const ColorButton = ({ children, className, active, gradient, style, ...rest }: ColorButtonProps) => {
  const bgBrightness = gradient?.bgColor ? getBrightness(rgbFromString(gradient.bgColor)) > 128 : false

  const buttonStyles = React.useMemo(() => {
    let toReturn = { ...style }

    if (gradient)
      toReturn = {
        ...toReturn,
        background: `linear-gradient(to ${gradient.position}, ${gradient.bgColor}, ${gradient.gradientColor})`,
      }

    return toReturn
  }, [gradient, style])

  return (
    <button
      {...rest}
      className={twMerge(
        clsx(
          'w-full border-0 p-3',
          'outline-dashed outline-1 outline-offset-4 hover:outline-primary',
          active ? 'outline-primary' : 'outline-white',
          bgBrightness ? 'text-black' : 'text-white',
          className
        )
      )}
      style={buttonStyles}
    >
      {children}
    </button>
  )
}
