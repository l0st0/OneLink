import React from 'react'
import isEqual from 'lodash/isEqual'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'

export type ItemComponentType<T> = React.ForwardRefExoticComponent<
  ItemComponentProps<T> & React.RefAttributes<HTMLDivElement>
>

export interface ItemComponentProps<T> {
  item: T
  data: T[]
  style?: any
  setActivatorNodeRef?: (element: HTMLElement | null) => void
  listeners?: SyntheticListenerMap
}

interface DndProps<T> {
  data: T[]
  ItemComponent: ItemComponentType<T>
  onDragEnd: (data: T[]) => void
}

export const Dnd = <T extends { id: string }>({ data = [], ItemComponent, onDragEnd }: DndProps<T>) => {
  const [activeItem, setActiveItem] = React.useState<T | undefined>(undefined)
  const [items, setItems] = React.useState<T[]>(data)

  React.useEffect(() => {
    if (!isEqual(data, items)) setItems(data)
  }, [data])

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

      const newArr = arrayMove(items, oldIndex, newIndex)
      if (onDragEnd) onDragEnd(newArr)

      return newArr
    })
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    const findItem = items.find((item) => item.id === String(active.id))
    setActiveItem(findItem)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} item={item} items={items} ItemComponent={ItemComponent} />
        ))}
      </SortableContext>

      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeItem ? <ItemComponent data={items} item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
