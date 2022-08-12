import React from 'react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from './components'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

export type ItemComponentType<T> = React.ForwardRefExoticComponent<
  ItemComponentProps<T> & React.RefAttributes<HTMLDivElement>
>

export interface ItemComponentProps<T> {
  item: T
  style?: any
  setActivatorNodeRef?: (element: HTMLElement | null) => void
  listeners?: SyntheticListenerMap
}

interface DndProps<T> {
  data: T[]
  ItemComponent: ItemComponentType<T>
}

export const Dnd = <T extends { id: string }>({ data, ItemComponent }: DndProps<T>) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)
  const [items, setItems] = React.useState<T[]>(data)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return
    if (active.id === over.id) return

    setItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      return arrayMove(items, oldIndex, newIndex)
    })
  }

  const handleDragStart = ({ active }: DragStartEvent) => setActiveId(active.id)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} item={item} ItemComponent={ItemComponent} />
        ))}
      </SortableContext>

      <DragOverlay>{activeId ? <ItemComponent item={items[0]} /> : null}</DragOverlay>
    </DndContext>
  )
}
