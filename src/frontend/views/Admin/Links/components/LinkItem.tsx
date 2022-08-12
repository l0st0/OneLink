import { ItemComponentProps } from '@/features'
import { Link } from '@/types'
import React from 'react'

export const LinkItem = React.forwardRef<HTMLDivElement, ItemComponentProps<Link>>(
  ({ item, style, setActivatorNodeRef, listeners, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest} style={style}>
        <button ref={setActivatorNodeRef} {...listeners}>
          Drag handle
        </button>
        {item.id}
      </div>
    )
  }
)
