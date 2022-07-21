import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const FooterContainer = styled.div`
  position: relative;
  background-color: white;
  margin-top: 100px;

  border-top-right-radius: 100px;

  ::after {
    content: '';
    position: absolute;
    background-color: ${(p) => p.theme.palette.background.default};

    top: -100px;
    left: 0px;
    width: 100px;
    height: 100px;
    border-top-left-radius: 100px;

    transform: rotate(270deg);
  }

  ::before {
    content: '';
    position: absolute;
    background-color: white;

    top: -100px;
    left: 0;
    width: 100px;
    height: 100px;
    border-top-right-radius: 100px;
  }
`

export const FooterContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  padding: 40px;
`

export const FooterLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 0;

  border-top: 1px solid black;
`

export const FooterLink = styled(Link)`
  text-transform: uppercase;
  color: black;
  font-size: 18px;
`

export const FooterBottom = styled.p`
  color: black;
  font-size: 14px;
`
