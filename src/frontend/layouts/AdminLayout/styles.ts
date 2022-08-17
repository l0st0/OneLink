import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const AdminContainer = styled.div(
  ({ theme }) => css`
    position: relative;
    display: grid;
    gap: ${theme.spaces[1]};
    grid-template-columns: min-content 1fr max-content;
  `
)

export const ChildrenContainer = styled.div<{ topOffset: number }>(
  ({ theme, topOffset }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: calc(100vh - ${topOffset}px);
    overflow: auto;
    padding: ${theme.spaces[8]};
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

export const PreviewContainer = styled.div(
  ({ theme }) => css`
    position: relative;
    background: ${theme.colors.white};
    padding: ${theme.spaces[8]};
  `
)

export const PreviewTop = styled.div(
  ({ theme }) => css`
    position: sticky;
    top: ${theme.spaces[6]};

    z-index: 100;
  `
)
