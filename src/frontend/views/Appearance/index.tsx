import { Flex, H3 } from '@/components'
import { useMainStore } from '@/store'

export const Appearance = () => {
  const profile = useMainStore((state) => state.name.profile)
  return (
    <Flex direction="column" align="center" width="100%">
      <H3>Appearance</H3>

      {profile.bio}
    </Flex>
  )
}
