import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const ContentContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    margin-top: ${theme.spaces[12]};
  `
)

export const DndContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    max-width: 100%;
    width: 100%;

    height: calc(100vh - 300px);
    overflow: auto;
  `
)

export const LinksContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    max-width: 600px;
  `
)
