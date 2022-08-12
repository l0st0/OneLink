import React from 'react'
import { TopNavigation } from './components'
import { PageContainer, TopBarContainer } from './styles'

export const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <PageContainer>
      <TopBarContainer>
        <TopNavigation />
      </TopBarContainer>
      {children}
    </PageContainer>
  )
}
