import { css } from '@emotion/react'
import styled from '@emotion/styled'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { SwitchProps } from '.'
import { Flex } from '../Flex'

export const SwitchContainer = styled(Flex)`
  cursor: pointer;
`

export const StyledSwitch = styled(SwitchPrimitive.Root)<SwitchProps>(
  ({ theme, checkedbg = 'primary', checked, active }) => css`
    position: relative;
    cursor: pointer;
    all: unset;
    width: ${theme.spaces[8]};
    height: ${theme.spaces[5]};
    border-radius: 9999px;
    background-color: ${checked && active ? theme.colors[checkedbg] : theme.colors.gray};
  `
)

export const StyledSwitchThumb = styled(SwitchPrimitive.Thumb)(
  ({ theme }) => css`
    display: block;
    width: ${theme.spaces[3.5]};
    height: ${theme.spaces[3.5]};
    background-color: ${theme.colors.white};
    border-radius: 9999px;
    transition: transform 100ms;
    transform: translateX(3px);
    will-change: transform;

    &[data-state='checked'] {
      transform: translateX(15px);
    }
  `
)
