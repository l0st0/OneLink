import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Label } from './Label'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const TextInput = ({ id, label, className, ...rest }: TextInputProps) => {
  return (
    <div className="flex w-full flex-col">
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        {...rest}
        id={id}
        type="text"
        className={twMerge(clsx('w-full rounded-primary bg-white px-4 py-2.5', 'with-ring', className))}
      />
    </div>
  )
}
