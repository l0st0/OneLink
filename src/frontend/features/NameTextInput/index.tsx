import { ColorTypes } from '@/types'
import { InputText, NameTextInputContainer, StartText } from './styles'

interface NameTextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder?: string
  borderColor: ColorTypes
  maxWidth: string
}

export const NameTextInput = ({
  onChange,
  value,
  placeholder,
  borderColor,
  maxWidth,
}: NameTextInputProps) => {
  return (
    <NameTextInputContainer borderColor={borderColor} maxWidth={maxWidth}>
      <StartText>onelink.ooo/</StartText>
      <InputText autoFocus type="text" onChange={onChange} value={value} placeholder={placeholder} />
    </NameTextInputContainer>
  )
}
