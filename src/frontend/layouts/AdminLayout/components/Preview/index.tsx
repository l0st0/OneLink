import { css } from '@emotion/react'
import { useIsMutating } from '@tanstack/react-query'
import { Flex, Paragraph, TextButton, TopBar } from '@/components'
import { useNameDataQuery, useNameQuery } from '@/store'
import { PreviewContainer, PreviewTop } from './styles'

export const Preview = () => {
  const mutating = useIsMutating()

  const { name } = useNameQuery()
  const { nameData } = useNameDataQuery()

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

      {!!mutating && <div>Mutating</div>}

      <Flex width="100px" style={{ color: 'black' }}>
        {JSON.stringify(nameData)}
      </Flex>
    </PreviewContainer>
  )
}
