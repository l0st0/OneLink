import { Flex, H3, OutlineButton, SubH2 } from '@/components'
import { useAppSelector } from '@/hooks'
import { Dnd } from '@/features'
import { LinksContainer } from './styles'
import { LinkItem } from './components'

export const Links = () => {
  const { links } = useAppSelector((state) => state.name)

  const createNewLink = () => {}

  return (
    <Flex direction="column" align="center" width="100%">
      <Flex align="center" gap="1" direction="column">
        <H3>Links</H3>
        <SubH2>Create or edit your links below</SubH2>
      </Flex>

      <LinksContainer>
        <OutlineButton onClick={createNewLink} fullSize>
          Add new link
        </OutlineButton>
        <Dnd data={links} ItemComponent={LinkItem} />
      </LinksContainer>
    </Flex>
  )
}
