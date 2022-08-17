import { v4 as uuidv4 } from 'uuid'
import { Dnd, Flex, H3, OutlineButton, SubH2 } from '@/components'
import { LinkItem } from '@/features'
import { AdminContentContainer, AdminHeading } from '@/layouts'
import { useMainStore } from '@/store'
import { Link } from '@/types'

export const Links = () => {
  const links = useMainStore((state) => state.links)
  const updateLinks = useMainStore((state) => state.updateLinks)
  const isUpdating = useMainStore((state) => state.isUpdating)

  const createNewLink = () => {
    const newLink = {
      id: uuidv4(),
      title: '',
      url: '',
      show: false,
      icon: '',
    }

    const newLinks = [newLink, ...links]
    updateLinks(newLinks)
  }

  const onDragEnd = (links: Link[]) => updateLinks(links)

  return (
    <>
      <AdminHeading>
        <H3>Links</H3>
        <SubH2>Create or edit your links below</SubH2>
      </AdminHeading>

      <AdminContentContainer>
        <OutlineButton disabled={isUpdating} onClick={createNewLink} fullSize>
          Add new link
        </OutlineButton>

        <Flex direction="column" width="100%" gap="4">
          <Dnd data={links} ItemComponent={LinkItem} onDragEnd={onDragEnd} />
        </Flex>
      </AdminContentContainer>
    </>
  )
}
