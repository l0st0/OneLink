import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex } from '../components/ui'

export const AdminHeading = styled(Flex)(
  ({ theme }) => css`
    align-items: center;
    flex-direction: column;
    gap: ${theme.spaces[1]};
    margin-bottom: ${theme.spaces[8]};
  `
)

export const AdminContentContainer = styled(Flex)(
  ({ theme, gap }) => css`
    width: 100%;
    max-width: 640px;
    flex-direction: column;
    align-items: center;
    gap: ${gap || theme.spaces[4]};
    margin: ${theme.spaces[2]} auto;
  `
)
