import { ColorTypes } from '@/types'
import { InputText, NameTextInputContainer, StartText } from './styles'

interface NameTextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder?: string
  borderColor: ColorTypes
}

export const NameTextInput = ({ onChange, value, placeholder, borderColor }: NameTextInputProps) => {
  return (
    <NameTextInputContainer borderColor={borderColor}>
      <StartText>onelink.ooo/</StartText>
      <InputText autoFocus type="text" onChange={onChange} value={value} placeholder={placeholder} />
    </NameTextInputContainer>
  )
}
