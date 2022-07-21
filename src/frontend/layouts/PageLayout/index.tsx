import React from 'react'
import { Footer, Navigation } from '..'
import { TopBarContainer, ContentContainer } from './styles'

export const PageLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <TopBarContainer>
        <Navigation />
      </TopBarContainer>
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </>
  )
}
