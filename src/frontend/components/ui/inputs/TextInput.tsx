import React from 'react'
import { BasicInput } from '.'
import { Flex } from '../Flex'
import { Label } from '../Label'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const TextInput = ({ id, label, ...rest }: TextInputProps) => {
  return (
    <Flex direction="column" width="100%">
      {label && <Label htmlFor={id}>{label}</Label>}
      <BasicInput id={id} {...rest} />
    </Flex>
  )
}
