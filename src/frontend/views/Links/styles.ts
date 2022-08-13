import { css } from '@emotion/react'
import styled from '@emotion/styled'

const marginBottom = 32

export const ContentContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    margin-top: ${theme.spaces[12]};
  `
)

export const DndContainer = styled.div<{ topOffset: number }>(
  ({ theme, topOffset }) => css`
    display: flex;
    justify-content: center;
    max-width: 600px;
    width: 100%;

    margin: ${theme.spaces[4]} auto;
    margin-bottom: ${marginBottom}px;
    padding-right: 12px;

    height: calc(100vh - ${topOffset + marginBottom}px);
    overflow: auto;
  `
)

export const LinksContainer = styled.div(
  () => css`
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
  `
)
