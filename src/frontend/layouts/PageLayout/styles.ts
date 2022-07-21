import styled from '@emotion/styled'

export const TopBarContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 100;

  background-color: ${(p) => p.theme.palette.background.default};
`

export const ContentContainer = styled.div`
  min-height: 100vh;
  margin-top: 60px;
`
