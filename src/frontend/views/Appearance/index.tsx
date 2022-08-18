import { H3 } from '@/components'
import { Themes } from '@/features'
import { AdminContentContainer, AdminHeading } from '@/layouts'

export const Appearance = () => {
  return (
    <>
      <AdminHeading>
        <H3>Appearance</H3>
      </AdminHeading>

      <AdminContentContainer>
        <Themes />
      </AdminContentContainer>
    </>
  )
}
