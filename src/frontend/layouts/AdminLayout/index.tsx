import { Flex, OutlineButton, Paragraph, TopBar } from '@/components'
import { useAppSelector } from '@/hooks'
import React from 'react'
import { SideNavigation } from './components'
import { AdminContainer, SideBarContainer, ChildrenContainer, PreviewContainer, PreviewTop } from './styles'

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
  const { name } = useAppSelector((state) => state.name)

  return (
    <AdminContainer>
      <SideBarContainer>
        <SideNavigation />
      </SideBarContainer>

      <ChildrenContainer>{children}</ChildrenContainer>

      <PreviewContainer>
        <PreviewTop>
          <TopBar visual="dark">
            <Flex align="center" justify="space-between" gap="8">
              <Flex gap="1" align="center">
                <Paragraph fontWeight="500">My OneLink:</Paragraph>
                <Paragraph fontWeight="100">https://onelink.ooo/{name}</Paragraph>
              </Flex>
              <OutlineButton>Share</OutlineButton>
            </Flex>
          </TopBar>
        </PreviewTop>
      </PreviewContainer>
    </AdminContainer>
  )
}
