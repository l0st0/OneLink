import { IcBadgeIconVertical } from '@/components'
import { FooterContainer, FooterContentContainer, FooterLink, FooterLinkContainer } from './styles'

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContentContainer>
        <IcBadgeIconVertical width={200} />
        <FooterLinkContainer>
          <FooterLink to="/">Home</FooterLink>
        </FooterLinkContainer>
      </FooterContentContainer>
    </FooterContainer>
  )
}
