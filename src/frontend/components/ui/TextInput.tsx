import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LabelWrapper } from '.'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const TextInput = ({ id, label, className, type = 'text', ...rest }: TextInputProps) => {
  return (
    <LabelWrapper label={label} id={id}>
      <input {...rest} id={id} type={type} className={twMerge(clsx('input-default ', className))} />
    </LabelWrapper>
  )
}
