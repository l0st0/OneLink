import React from 'react'
import { TopBar } from '../TopBar'
import { PageContainer, TopBarContainer } from './styles'

const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <PageContainer>
      <TopBarContainer>
        <TopBar />
      </TopBarContainer>
      {children}
    </PageContainer>
  )
}

export default PageLayout
