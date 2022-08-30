import React from 'react'
import { isEqual } from 'lodash'
import { AvatarImage, AvatarText, Flex, LoadingData, TextAreaInput, TextInput } from '@/components'
import { useDebounce } from '@/hooks'
import { AdminContentContainer } from '@/layouts'
import { useAboutQuery, useAboutStore, useNameQuery, useSaveAbout } from '@/store'

export const AboutContent = () => {
  const { name } = useNameQuery()
  const { about } = useAboutQuery()
  const { saveAbout } = useSaveAbout()

  const { setLocalAbout, localAbout } = useAboutStore((state) => state)

  const debouncedAbout = useDebounce(localAbout, 1500)

  React.useEffect(() => {
    if (!debouncedAbout || isEqual(debouncedAbout, about)) return
    saveAbout(debouncedAbout)
  }, [debouncedAbout])

  if (!localAbout) return <LoadingData />

  const onTitleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    localAbout && setLocalAbout({ ...localAbout, title: target.value })
  }

  const onBioChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    localAbout && setLocalAbout({ ...localAbout, bio: target.value })
  }

  return (
    <AdminContentContainer>
      {localAbout.image ? (
        <AvatarImage src={localAbout.image} />
      ) : (
        <AvatarText>{name?.name.charAt(0)}</AvatarText>
      )}
      <Flex direction="column" gap="4" width="100%">
        <TextInput
          id="title"
          label="Title"
          value={localAbout.title}
          onChange={onTitleChange}
          placeholder={`@${name?.name}`}
        />
        <TextAreaInput
          id="bio"
          label="Bio"
          value={localAbout.bio}
          onChange={onBioChange}
          maxLength={80}
          placeholder="Enter a bio description"
        />
      </Flex>
    </AdminContentContainer>
  )
}
