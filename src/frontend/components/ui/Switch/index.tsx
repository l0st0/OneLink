import { SwitchProps as RadixSwitchProps } from '@radix-ui/react-switch'
import { ColorTypes } from '@/types'
import { StyledSwitch, StyledSwitchThumb, SwitchContainer } from './styles'

export interface SwitchProps extends RadixSwitchProps {
  id: string
  label?: string
  checkedbg?: ColorTypes
  active?: 0 | 1
}

export const Switch = ({ id, label, checkedbg, active = 1, ...rest }: SwitchProps) => {
  return (
    <SwitchContainer>
      {label && <label htmlFor={id}>{label}</label>}
      <StyledSwitch {...rest} id={id} checkedbg={checkedbg} active={active}>
        <StyledSwitchThumb />
      </StyledSwitch>
    </SwitchContainer>
  )
}
