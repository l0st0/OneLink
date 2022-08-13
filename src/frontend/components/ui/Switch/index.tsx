import { SwitchProps as RadixSwitchProps } from '@radix-ui/react-switch'
import { ColorTypes } from '@/types'
import { Flex } from '../Flex'
import { StyledSwitch, StyledSwitchThumb } from './styles'

export interface SwitchProps extends RadixSwitchProps {
  id: string
  label?: string
  checkedbg?: ColorTypes
  active?: boolean
}

export const Switch = ({ id, label, checkedbg, active = true, ...rest }: SwitchProps) => {
  return (
    <Flex>
      {label && <label htmlFor={id}>{label}</label>}
      <StyledSwitch {...rest} id={id} checkedbg={checkedbg} active={active}>
        <StyledSwitchThumb />
      </StyledSwitch>
    </Flex>
  )
}
