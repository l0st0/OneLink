import { ClearButton, Flex } from '@/components'
import { ItemComponentProps } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateLinks } from '@/store/name/nameSlice'
import { Link } from '@/types'
import { IconPhoto, IconTrash } from '@tabler/icons'
import React from 'react'
import { HandleIcon, LinkItemContent, LinkItemHandle, LinkItemStyled } from './styles'

export const LinkItem = React.forwardRef<HTMLDivElement, ItemComponentProps<Link>>(
  ({ item, style, setActivatorNodeRef, listeners, ...rest }, ref) => {
    const { name, links, updating } = useAppSelector((state) => state.name)

    const dispatch = useAppDispatch()

    const removeLink = () => {
      const filterArr = links.filter(({ id }) => id !== item.id)
      dispatch(updateLinks({ name, links: filterArr }))
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

            <ClearButton disabled={updating} onClick={removeLink}>
              <IconTrash />
            </ClearButton>
          </Flex>
        </LinkItemContent>
      </LinkItemStyled>
    )
  }
)
