import { v4 as uuidv4 } from 'uuid'
import { OutlineButton } from '@/components'
import { Dnd, LinkItem, LoadingData } from '@/features'
import { AdminContentContainer, AdminHeadingContainer } from '@/layouts'
import { useLinkQuery, useSaveLinks } from '@/store'
import { Link } from '@/types'

export const Links = () => {
  const { links, isLoading } = useLinkQuery()
  const { saveLinks } = useSaveLinks()

  const createNewLink = () => {
    const newLink = {
      id: uuidv4(),
      title: '',
      url: '',
      show: false,
      icon: '',
    }

    const newLinks = [newLink, ...links]
    saveLinks(newLinks)
  }

  const onDragEnd = (links: Link[]) => saveLinks(links)

  return (
    <>
      <AdminHeadingContainer>
        <h3>Links</h3>
        <h6>Create or edit your links below</h6>
      </AdminHeadingContainer>

      <AdminContentContainer>
        {isLoading ? (
          <LoadingData />
        ) : (
          <>
            <OutlineButton onClick={createNewLink} className="w-full">
              Add new link
            </OutlineButton>

            {links && (
              <div className="flex w-full flex-col gap-4">
                <Dnd data={links} ItemComponent={LinkItem} onDragEnd={onDragEnd} />
              </div>
            )}
          </>
        )}
      </AdminContentContainer>
    </>
  )
}
