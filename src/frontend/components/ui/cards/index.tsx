import React from 'react'
import { CardContainer, CardTitle } from './styles'

interface CardProps {
  title?: string
}

export const Card = ({ title, children }: React.PropsWithChildren<CardProps>) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardContainer>{children}</CardContainer>
    </>
  )
}
