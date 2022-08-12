import { ItemComponentProps } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateLinks } from '@/store/name/nameSlice'
import { Link } from '@/types'
import React from 'react'

export const LinkItem = React.forwardRef<HTMLDivElement, ItemComponentProps<Link>>(
  ({ item, style, setActivatorNodeRef, listeners, ...rest }, ref) => {
    const { name, links, updating } = useAppSelector((state) => state.name)

    const dispatch = useAppDispatch()

    const removeLink = () => {
      const filterArr = links.filter(({ id }) => id !== item.id)
      dispatch(updateLinks({ name, links: filterArr }))
    }

    return (
      <div ref={ref} {...rest} style={style}>
        <button ref={setActivatorNodeRef} {...listeners}>
          Drag handle
        </button>
        {item.id}
        <button disabled={updating} onClick={removeLink}>
          Remove link
        </button>
      </div>
    )
  }
)
