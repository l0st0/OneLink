import React from 'react'
import { IconChartLine, IconTrash } from '@tabler/icons'
import { Flex, IconButton, ItemComponentProps, Switch } from '@/components'
import { useMainStore } from '@/store'
import { Link } from '@/types'
import {
  AnalyticsButton,
  HandleIcon,
  LinkInput,
  LinkItemContent,
  LinkItemHandle,
  LinkItemStyled,
} from './styles'

export const LinkItem = React.forwardRef<HTMLDivElement, ItemComponentProps<Link>>(
  ({ item, style, setActivatorNodeRef, listeners, ...rest }, ref) => {
    const [localItem, setLocalItem] = React.useState(item)

    const name = useMainStore((state) => state.name.name)
    const links = useMainStore((state) => state.name.links)
    const updateLinks = useMainStore((state) => state.updateLinks)

    const linkIndex = React.useMemo(() => links.findIndex(({ id }) => id === item.id), [links, item])

    const isActiveSwitch = React.useMemo(
      () => !!localItem.title.length && !!localItem.url.length,
      [localItem.title, localItem.url]
    )

    const removeLink = () => {
      const filterLinks = links.filter(({ id }) => id !== item.id)
      updateLinks(name, filterLinks)
    }

    const onInputChange =
      (id: 'title' | 'url') =>
      ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setLocalItem((prev) => ({ ...prev, [id]: target.value }))

    const onInputBlur = () => {
      let show = false
      if (isActiveSwitch && localItem.show) show = true

      const updatedLinks = [...links]

      updatedLinks[linkIndex] = { ...localItem, show }
      updateLinks(name, updatedLinks)
    }

    const onCheckedChange = (show: boolean) => {
      setLocalItem((prev) => ({ ...prev, show }))
      if (!isActiveSwitch) return

      const updatedLinks = [...links]
      updatedLinks[linkIndex] = { ...localItem, show }
      updateLinks(name, updatedLinks)
    }

    return (
      <LinkItemStyled ref={ref} {...rest} style={style}>
        <LinkItemHandle ref={setActivatorNodeRef} {...listeners}>
          <HandleIcon />
        </LinkItemHandle>

        <LinkItemContent>
          <Flex direction="column" width="100%" gap="1">
            <Flex justify="space-between" width="100%">
              <Flex direction="column" gap="2" width="100%" mr="4">
                <LinkInput
                  placeholder="Title"
                  value={localItem.title}
                  onChange={onInputChange('title')}
                  onBlur={onInputBlur}
                  fontWeight="600"
                />

                <LinkInput
                  placeholder="Url"
                  value={localItem.url}
                  onChange={onInputChange('url')}
                  onBlur={onInputBlur}
                />
              </Flex>

              <Switch
                id={item.id}
                active={isActiveSwitch}
                checked={localItem.show}
                onCheckedChange={onCheckedChange}
              />
            </Flex>
          </Flex>

          <Flex justify="space-between">
            <AnalyticsButton color="black">
              <IconChartLine />
              <span>0 clicks</span>
            </AnalyticsButton>

            <IconButton onClick={removeLink} hovercolor="error">
              <IconTrash />
            </IconButton>
          </Flex>
        </LinkItemContent>
      </LinkItemStyled>
    )
  }
)
