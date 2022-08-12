import { ClearButton, Flex } from '@/components'
import { ItemComponentProps } from '@/features'
import { useMainStore } from '@/store'
import { Link } from '@/types'
import { IconPhoto, IconTrash } from '@tabler/icons'
import React from 'react'
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
          <Flex justify="space-between">
            <input placeholder="Title" value={item.title} />
            <button>Switch</button>
          </Flex>

          <input placeholder="Url" value={item.id} />

          <Flex justify="space-between">
            <ClearButton>
              <IconPhoto />
            </ClearButton>

            <ClearButton onClick={removeLink}>
              <IconTrash />
            </ClearButton>
          </Flex>
        </LinkItemContent>
      </LinkItemStyled>
    )
  }
)
