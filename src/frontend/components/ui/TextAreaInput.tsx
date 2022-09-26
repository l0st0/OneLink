import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LabelWrapper } from '.'

interface TextAreaInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  rows?: number
}

export const TextAreaInput = ({ id, label, className, rows = 4, ...rest }: TextAreaInputProps) => {
  return (
    <LabelWrapper label={label} id={id}>
      <textarea {...rest} id={id} rows={rows} className={twMerge(clsx('input-default', className))} />
    </LabelWrapper>
  )
}
