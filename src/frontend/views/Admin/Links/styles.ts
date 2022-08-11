import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const LinksContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    max-width: 600px;

    margin-top: ${theme.spaces[12]};
  `
)
