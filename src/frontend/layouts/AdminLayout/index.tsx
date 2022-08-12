import { Flex, TextButton, Paragraph, TopBar } from '@/components'
import { useMainStore } from '@/store'
import { css } from '@emotion/react'
import React from 'react'
import { SideNavigation } from './components'
import { AdminContainer, SideBarContainer, ChildrenContainer, PreviewContainer, PreviewTop } from './styles'

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
  const name = useMainStore((state) => state.name.name)

  return (
    <AdminContainer>
      <SideBarContainer>
        <SideNavigation />
      </SideBarContainer>

      <ChildrenContainer>{children}</ChildrenContainer>

      <PreviewContainer>
        <PreviewTop>
          <TopBar visual="dark">
            <Flex align="center" justify="space-between" gap="20">
              <Flex gap="2" align="center">
                <Paragraph>My OneLink:</Paragraph>
                <Paragraph fontWeight="100">https://onelink.ooo/{name}</Paragraph>
              </Flex>
              <TextButton
                textTransform="none"
                css={(theme) =>
                  css`
                    padding-right: ${theme.spaces[0]};
                  `
                }
              >
                Share
              </TextButton>
            </Flex>
          </TopBar>
        </PreviewTop>
      </PreviewContainer>
    </AdminContainer>
  )
}
