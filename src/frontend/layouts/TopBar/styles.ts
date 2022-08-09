import styled from '@emotion/styled'

export const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: white;
  color: black;
  border-radius: ${(p) => p.theme.radius.normal};

  padding: ${(p) => p.theme.spaces[2]} ${(p) => p.theme.spaces[4]};
`
