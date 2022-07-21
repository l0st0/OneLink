import styled from '@emotion/styled'

interface ContainerProps {
  maxWidth?: number
}

interface FlexProps {
  flexDirection?: 'row' | 'column' | 'column-reverse' | 'row-reverse'
  gap?: number
  alignItems?: 'center' | 'flex-end' | 'flex-start'
  textAlign?: 'center' | 'left' | 'right'
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 0 auto;
  padding: 16px 24px;

  max-width: ${(p) => p.maxWidth || p.theme.container.max}px;
`

export const ParagraphContainer = styled.div<ContainerProps>`
  max-width: ${(p) => p.maxWidth || p.theme.container.max}px;
`

export const Flex = styled.div<FlexProps>`
  display: flex;

  gap: ${({ gap = 0 }) => gap}px;
  flex-direction: ${({ flexDirection = 'row' }) => flexDirection};
  align-items: ${({ alignItems = 'flex-start' }) => alignItems};
  text-align: ${({ textAlign = 'left' }) => textAlign};
`
