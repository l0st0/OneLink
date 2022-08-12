import { v4 as uuidv4 } from 'uuid'
import { Flex, H3, OutlineButton, SubH2 } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Dnd } from '@/features'
import { LinksContainer } from './styles'
import { LinkItem } from './components'
import { updateLinks } from '@/store/name/nameSlice'
import { Link } from '@/types'

export const Links = () => {
  const { name, links, updating } = useAppSelector((state) => state.name)

  const dispatch = useAppDispatch()

  const createNewLink = () => {
    const newLink = {
      id: uuidv4(),
      title: '',
      url: '',
      show: false,
      icon: '',
    }

    const newLinks = [...links, newLink]
    dispatch(updateLinks({ name, links: newLinks }))
  }

  const onDragEnd = (links: Link[]) => dispatch(updateLinks({ name, links }))

  return (
    <Flex direction="column" align="center" width="100%">
      <Flex align="center" gap="1" direction="column">
        <H3>Links</H3>
        <SubH2>Create or edit your links below</SubH2>
      </Flex>

      <LinksContainer>
        <OutlineButton disabled={updating} onClick={createNewLink} fullSize>
          Add new link
        </OutlineButton>

        <Dnd data={links} ItemComponent={LinkItem} onDragEnd={onDragEnd} />
      </LinksContainer>
    </Flex>
  )
}
