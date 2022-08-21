import { css } from '@emotion/react'
import { Flex, Paragraph, TextButton, TopBar } from '@/components'
import { useNameDataQuery, useNameQuery } from '@/store'
import { PreviewContainer, PreviewTop } from './styles'

export const Preview = () => {
  const { data: name } = useNameQuery()
  const { data: nameData } = useNameDataQuery(name?.name)

  return (
    <PreviewContainer>
      <PreviewTop>
        <TopBar visual="dark">
          <Flex align="center" justify="space-between" gap="20">
            <Flex gap="2" align="center">
              <Paragraph>My OneLink:</Paragraph>
              <Paragraph fontWeight="100">https://onelink.ooo/{name?.name}</Paragraph>
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

      <Flex width="100px" style={{ color: 'black' }}>
        {JSON.stringify(nameData)}
      </Flex>
    </PreviewContainer>
  )
}
