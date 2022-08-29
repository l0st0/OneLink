import { NavLink, useLocation } from 'react-router-dom'
import { IconLayersSubtract, IconLink, IconUserCircle } from '@tabler/icons'
import { Flex, OneLinkIcon, SideBar } from '@/components'
import { IconLinkButton } from './styles'

export const SideNavigation = () => {
  const { pathname } = useLocation()

  const navLinks = [
    { to: '/admin/links', icon: <IconLink /> },
    { to: '/admin/about', icon: <IconUserCircle /> },
    { to: '/admin/look', icon: <IconLayersSubtract /> },
  ]

  return (
    <SideBar>
      <Flex justify="center" mb="8">
        <OneLinkIcon width={36} />
      </Flex>

      <Flex direction="column" align="center" gap="1">
        {navLinks.map(({ to, icon }) => (
          <NavLink key={to} to={to}>
            <IconLinkButton active={to === pathname}>{icon}</IconLinkButton>
          </NavLink>
        ))}
      </Flex>
    </SideBar>
  )
}
