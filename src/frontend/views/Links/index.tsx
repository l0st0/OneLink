import { v4 as uuidv4 } from 'uuid'
import { Dnd, Flex, H3, OutlineButton, SubH2 } from '@/components'
import { LinkItem } from '@/features'
import { AdminContentContainer, AdminHeading } from '@/layouts'
import { useLinkQuery, useSaveLinks } from '@/store'
import { Link } from '@/types'

export const Links = () => {
  const { data: linksData } = useLinkQuery()
  const { mutate: saveLinks } = useSaveLinks()

  const links = linksData ?? []

  const createNewLink = () => {
    const newLink = {
      id: uuidv4(),
      title: '',
      url: '',
      show: false,
      icon: '',
    }

    const newLinks = [newLink, ...links]
    saveLinks(newLinks)
  }

  const onDragEnd = (links: Link[]) => saveLinks(links)

  return (
    <>
      <AdminHeading>
        <H3>Links</H3>
        <SubH2>Create or edit your links below</SubH2>
      </AdminHeading>

      <AdminContentContainer>
        <OutlineButton onClick={createNewLink} fullSize>
          Add new link
        </OutlineButton>

        {!!links.length && (
          <Flex direction="column" width="100%" gap="4">
            <Dnd data={links} ItemComponent={LinkItem} onDragEnd={onDragEnd} />
          </Flex>
        )}
      </AdminContentContainer>
    </>
  )
}
