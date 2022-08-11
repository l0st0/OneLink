import { Flex, H3, OutlineButton, SubH2 } from '@/components'
import { useAppSelector } from '@/hooks'
import { LinksContainer } from './styles'

export const Links = () => {
  const { links } = useAppSelector((state) => state.name)

  return (
    <Flex direction="column" align="center" width="100%">
      <Flex align="center" gap="1" direction="column">
        <H3>Links</H3>
        <SubH2>Create or edit your links below</SubH2>
      </Flex>

      <LinksContainer>
        <OutlineButton fullSize>Add new link</OutlineButton>
        {links.map(({ id }) => (
          <div key={id}>{id}</div>
        ))}
      </LinksContainer>
    </Flex>
  )
}
