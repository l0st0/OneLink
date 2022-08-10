import React from 'react'
import { TopBar } from '../TopBar'
import { PageContainer, TopBarContainer } from './styles'

export const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <PageContainer>
      <TopBarContainer>
        <TopBar />
      </TopBarContainer>
      {children}
    </PageContainer>
  )
}
