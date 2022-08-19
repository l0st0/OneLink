import { Flex, H3, H6 } from '@/components'
import { AdminContentContainer, AdminHeading } from '@/layouts'
import { Themes } from './components'

export const Appearance = () => {
  return (
    <>
      <AdminHeading>
        <H3>Appearance</H3>
      </AdminHeading>

      <AdminContentContainer gap="12">
        <Flex width="100%" direction="column">
          <H6>Themes</H6>
          <Themes />
        </Flex>

        <Flex width="100%" direction="column">
          <H6>Backgrounds</H6>
          <Themes />
        </Flex>
      </AdminContentContainer>
    </>
  )
}
