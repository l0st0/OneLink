import { IcBadgeIconFlat } from '@/components'
import { NavbarContainer, NavBarLink, NavBarLinkContainer } from './styles'

export const Navigation = () => {
  return (
    <NavbarContainer>
      <IcBadgeIconFlat />
      <NavBarLinkContainer>
        <NavBarLink to="/">Home</NavBarLink>
      </NavBarLinkContainer>
    </NavbarContainer>
  )
}
