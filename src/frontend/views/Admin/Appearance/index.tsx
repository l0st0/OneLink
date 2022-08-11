import { Flex, H3 } from '@/components'
import { useAppSelector } from '@/hooks'

export const Appearance = () => {
  const { profile } = useAppSelector((state) => state.name)
  return (
    <Flex direction="column" align="center" width="100%">
      <H3>Appearance</H3>

      {profile.bio}
    </Flex>
  )
}
