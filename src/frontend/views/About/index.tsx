import { H3 } from '@/components'
import { AdminHeading } from '@/layouts'
import { AboutContent } from './AboutContent'

export const About = () => {
  return (
    <>
      <AdminHeading>
        <H3>About you</H3>
      </AdminHeading>

      <AboutContent />
    </>
  )
}
