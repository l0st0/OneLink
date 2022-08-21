import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ItemComponentType } from '..'

interface SortableItemProps<T> {
  ItemComponent: ItemComponentType<T>
  item: T
  items: T[]
}

export const SortableItem = <T extends { id: string }>({
  ItemComponent,
  item,
  items,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({
      id: item.id,
      transition: {
        duration: 500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '0' : '1',
  }

  return (
    <ItemComponent
      ref={setNodeRef}
      style={style}
      {...attributes}
      item={item}
      data={items}
      setActivatorNodeRef={setActivatorNodeRef}
      listeners={listeners}
    />
  )
}
