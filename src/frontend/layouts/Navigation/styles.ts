import { Container } from '@/components'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const NavbarContainer = styled(Container)`
  display: grid;
  grid-template-columns: 200px 1fr;
  justify-items: end;
  padding: 16px 24px;
  align-items: center;
`

export const NavBarLinkContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 560px;
  justify-content: space-between;
  gap: 12px;
`

export const NavBarLink = styled(Link)`
  text-transform: uppercase;
  color: white;
  font-size: 14px;
`
