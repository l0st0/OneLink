import styled from '@emotion/styled'

interface ContainerProps {
  maxWidth?: number
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 0 auto;
  padding: 16px 24px;

  max-width: ${(p) => p.maxWidth || p.theme.width.max}px;
`
