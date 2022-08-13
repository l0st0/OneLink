import React from 'react'
import { IconPhoto, IconTrash } from '@tabler/icons'
import { Flex, IconButton, ItemComponentProps } from '@/components'
import { useMainStore } from '@/store'
import { Link } from '@/types'
import { HandleIcon, LinkItemContent, LinkItemHandle, LinkItemStyled } from './styles'

export const LinkItem = React.forwardRef<HTMLDivElement, ItemComponentProps<Link>>(
  ({ item, style, setActivatorNodeRef, listeners, ...rest }, ref) => {
    const name = useMainStore((state) => state.name.name)
    const links = useMainStore((state) => state.name.links)
    const updateLinks = useMainStore((state) => state.updateLinks)

    const removeLink = () => {
      const filterLinks = links.filter(({ id }) => id !== item.id)
      updateLinks(name, filterLinks)
    }

    return (
      <LinkItemStyled ref={ref} {...rest} style={style}>
        <LinkItemHandle ref={setActivatorNodeRef} {...listeners}>
          <HandleIcon />
        </LinkItemHandle>

        <LinkItemContent>
          <Flex direction="column" width="100%" gap="1">
            <Flex justify="space-between" width="100%">
              <input placeholder="Title" value={item.title} onChange={() => {}} />
              <button>Switch</button>
            </Flex>

            <input placeholder="Url" value={item.id} onChange={() => {}} />
          </Flex>

          <Flex justify="space-between">
            <IconButton>
              <IconPhoto />
            </IconButton>

            <IconButton onClick={removeLink} color="error">
              <IconTrash />
            </IconButton>
          </Flex>
        </LinkItemContent>
      </LinkItemStyled>
    )
  }
)
