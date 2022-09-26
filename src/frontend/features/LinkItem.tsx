import React from 'react'
import { IconChartLine, IconDotsVertical, IconTrash } from '@tabler/icons'
import { IconButton, Switch } from '@/components'
import { useSaveLinks } from '@/store'
import { Link } from '@/types'
import { ItemComponentProps } from './Dnd'

export const LinkItem = React.forwardRef<HTMLDivElement, ItemComponentProps<Link>>(
  ({ data: links = [], item, style, setActivatorNodeRef, listeners, ...rest }, ref) => {
    const [localItem, setLocalItem] = React.useState(item)

    const { saveLinks } = useSaveLinks()

    React.useEffect(() => {
      setLocalItem(item)
    }, [item])

    const linkIndex = React.useMemo(() => links.findIndex(({ id }) => id === item.id), [links, item])

    const isActiveSwitch = React.useMemo(() => {
      if (!!localItem.title.length && !!localItem.url.length) return true
      return false
    }, [localItem.title, localItem.url])

    const removeLink = () => {
      const filterLinks = links.filter(({ id }) => id !== item.id)
      saveLinks(filterLinks)
    }

    const onInputChange =
      (id: 'title' | 'url') =>
      ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setLocalItem((prev) => ({ ...prev, [id]: target.value }))

    const onInputBlur = () => {
      let show = false
      const copyItem = { ...localItem }
      if (isActiveSwitch && copyItem.show) show = true

      const updatedLinks = [...links]

      if (copyItem.url.length && !copyItem.url.startsWith('http')) {
        copyItem.url = `https://${copyItem.url}`
      }

      updatedLinks[linkIndex] = { ...copyItem, show }
      saveLinks(updatedLinks)
    }

    const onCheckedChange = (show: boolean) => {
      setLocalItem((prev) => ({ ...prev, show }))
      if (!isActiveSwitch) return

      const updatedLinks = [...links]
      updatedLinks[linkIndex] = { ...localItem, show }
      saveLinks(updatedLinks)
    }

    return (
      <div className="flex w-full rounded-primary bg-white text-black" ref={ref} {...rest} style={style}>
        <button {...listeners} ref={setActivatorNodeRef} className="cursor-grab border-0 bg-transparent px-2">
          <IconDotsVertical className="text-gray" width={20} />
        </button>

        <div className="flex w-full flex-col justify-between gap-4 p-4">
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full justify-between">
              <div className="mr-4 flex w-full flex-col gap-2">
                <input
                  type="text"
                  placeholder="Title"
                  value={localItem.title}
                  onChange={onInputChange('title')}
                  onBlur={onInputBlur}
                  className="bg-transparent font-semibold"
                />

                <input
                  type="text"
                  placeholder="Url"
                  value={localItem.url}
                  onChange={onInputChange('url')}
                  onBlur={onInputBlur}
                  className="bg-transparent text-sm"
                />
              </div>

              <Switch
                id={item.id}
                active={isActiveSwitch}
                checked={localItem.show}
                onChange={onCheckedChange}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <IconButton className="flex items-center gap-1 text-black">
              <IconChartLine width={20} className="cursor-default text-black" />
              <p className="text-sm lowercase">0 clicks</p>
            </IconButton>

            <IconButton onClick={removeLink} className="text-black hover:text-error">
              <IconTrash />
            </IconButton>
          </div>
        </div>
      </div>
    )
  }
)
