import React from 'react'
import { useElementPosition } from '@/hooks'
import { Preview, SideNavigation } from './components'
import { AdminContainer, ChildrenContainer, SideBarContainer } from './styles'

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { topOffset } = useElementPosition({ ref })

  return (
    <AdminContainer>
      <SideBarContainer>
        <SideNavigation />
      </SideBarContainer>

      <ChildrenContainer ref={ref} topOffset={topOffset}>
        {children}
      </ChildrenContainer>

      <Preview />
    </AdminContainer>
  )
}
