import { ColorTypes, SpaceTypes } from '@/types'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

interface SpinnerProps {
  color?: ColorTypes
  size?: SpaceTypes
  borderSize?: SpaceTypes
}

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const Spinner = styled.div<SpinnerProps>(
  ({ theme, color = 'primary', size = '4', borderSize = 'px' }) => css`
    border: ${theme.spaces[borderSize]} solid transparent;
    border-top: ${theme.spaces[borderSize]} solid ${theme.colors[color]};
    border-right: ${theme.spaces[borderSize]} solid ${theme.colors[color]};
    border-radius: 50%;

    width: ${theme.spaces[size]};
    height: ${theme.spaces[size]};

    animation: ${spin} 1s linear infinite;
  `
)
