import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const Label = ({
  children,
  className,
  ...rest
}: React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>) => (
  <label {...rest} className={twMerge(clsx('font-medium tracking-wide', className))}>
    {children}
  </label>
)
