import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Label } from './Label'

interface TextAreaInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  rows?: number
}

export const TextAreaInput = ({ id, label, className, rows = 4, ...rest }: TextAreaInputProps) => {
  return (
    <div className="flex w-full flex-col">
      {label && <Label htmlFor={id}>{label}</Label>}
      <textarea
        {...rest}
        id={id}
        rows={rows}
        className={twMerge(clsx('w-full rounded-primary bg-white px-4 py-2.5', 'with-ring', className))}
      />
    </div>
  )
}
