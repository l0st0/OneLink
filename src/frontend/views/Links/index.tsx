import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Dnd, Flex, H3, OutlineButton, SubH2 } from '@/components'
import { LinkItem } from '@/features'
import { useElementPosition } from '@/hooks'
import { useMainStore } from '@/store'
import { Link } from '@/types'
import { ContentContainer, DndContainer, LinksContainer } from './styles'

export const Links = () => {
  const name = useMainStore((state) => state.name.name)
  const links = useMainStore((state) => state.name.links)
  const updateLinks = useMainStore((state) => state.updateLinks)
  const isUpdating = useMainStore((state) => state.isUpdating)

  const ref = React.useRef<HTMLDivElement>(null)
  const { topOffset } = useElementPosition({ ref })

  const createNewLink = () => {
    const newLink = {
      id: uuidv4(),
      title: '',
      url: '',
      show: false,
      icon: '',
    }

    const newLinks = [newLink, ...links]
    updateLinks(name, newLinks)
  }

  const onDragEnd = (links: Link[]) => updateLinks(name, links)

  return (
    <Flex direction="column" align="center" width="100%">
      <Flex align="center" gap="1" direction="column">
        <H3>Links</H3>
        <SubH2>Create or edit your links below</SubH2>
      </Flex>

      <ContentContainer>
        <LinksContainer>
          <OutlineButton disabled={isUpdating} onClick={createNewLink} fullSize>
            Add new link
          </OutlineButton>
        </LinksContainer>

        <DndContainer ref={ref} topOffset={topOffset}>
          <LinksContainer>
            <Dnd data={links} ItemComponent={LinkItem} onDragEnd={onDragEnd} />
          </LinksContainer>
        </DndContainer>
      </ContentContainer>
    </Flex>
  )
}
