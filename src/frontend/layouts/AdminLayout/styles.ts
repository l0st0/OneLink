import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const AdminContainer = styled.div(
  () => css`
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr max-content;
  `
)

export const SideBarContainer = styled.div(
  () => css`
    position: sticky;
    height: 100vh;
    top: 0;
    left: 0;

    z-index: 100;
  `
)

export const ChildrenContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: ${theme.spaces[8]};
  `
)

export const PreviewContainer = styled(ChildrenContainer)(
  () => css`
    position: relative;
    background: white;
  `
)

export const PreviewTop = styled.div(
  ({ theme }) => css`
    position: sticky;
    top: ${theme.spaces[6]};

    z-index: 100;
  `
)
