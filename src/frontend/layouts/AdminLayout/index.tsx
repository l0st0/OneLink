import React from 'react'
import { SideNavigation } from './components'
import { AdminContainer, SideBarContainer } from './styles'

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <AdminContainer>
      <SideBarContainer>
        <SideNavigation />
      </SideBarContainer>

      {children}
    </AdminContainer>
  )
}
