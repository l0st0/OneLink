// import React from 'react'
// import { isEqual } from 'lodash'
// import { AvatarImage, AvatarText, Flex, H3, TextAreaInput, TextInput } from '@/components'
// import { useDebounce } from '@/hooks'
// import { AdminContentContainer, AdminHeading } from '@/layouts'

// import { useNameStore } from '@/store'

export const About = () => {
  // const name = useNameStore((state) => state.name)
  // const profile = useNameStore((state) => state.profile)
  // const localProfile = useNameStore((state) => state.localProfile)
  // const updateLocalProfile = useNameStore((state) => state.updateLocalProfile)
  // const saveProfile = useNameStore((state) => state.saveProfile)

  // if (!localProfile) return <div>No profile found.</div>

  // const debouncedProfile = useDebounce(localProfile, 1500)

  // React.useEffect(() => {
  //   if (isEqual(debouncedProfile, profile)) return
  //   saveProfile(debouncedProfile)
  // }, [debouncedProfile])

  // const onTitleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   updateLocalProfile({ ...localProfile, title: target.value })
  // }

  // const onBioChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   updateLocalProfile({ ...localProfile, bio: target.value })
  // }

  return (
    <>
      {/* <AdminHeading>
        <H3>About you</H3>
      </AdminHeading>

      <AdminContentContainer>
        {localProfile.image ? (
          <AvatarImage src={localProfile.image} />
        ) : (
          <AvatarText>{name.charAt(0)}</AvatarText>
        )}
        <Flex direction="column" gap="4" width="100%">
          <TextInput
            id="title"
            label="Title"
            value={localProfile.title}
            onChange={onTitleChange}
            placeholder={`@${name}`}
          />
          <TextAreaInput
            id="bio"
            label="Bio"
            value={localProfile.bio}
            onChange={onBioChange}
            maxLength={80}
            placeholder="Enter a bio description"
          />
        </Flex>
      </AdminContentContainer> */}
    </>
  )
}
