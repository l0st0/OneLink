import React from 'react'
import { BasicTextArea } from '.'
import { Flex } from '../Flex'
import { Label } from '../Label'

interface TextAreaInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const TextAreaInput = ({ id, label, ...rest }: TextAreaInputProps) => {
  return (
    <Flex direction="column" width="100%">
      {label && <Label htmlFor={id}>{label}</Label>}
      <BasicTextArea id={id} {...rest} />
    </Flex>
  )
}
