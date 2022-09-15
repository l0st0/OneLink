import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { Transition } from '@headlessui/react'
import { ColorButton } from '../components/ui'

interface ColorButtonWithPalleteProps {
  color: string
  onChange: (newColor: string) => void
  label?: string
}

export const ColorButtonWithPallete = ({ color, onChange, label = '' }: ColorButtonWithPalleteProps) => {
  const [open, setOpen] = React.useState(false)

  const onButtonClick = () => setOpen((prev) => !prev)

  return (
    <div className="flex flex-col gap-4">
      <ColorButton onClick={onButtonClick} style={{ background: color }}>
        {label}
      </ColorButton>
      <Transition
        show={open}
        enter="transition-opacity ease-linear duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <HexColorPicker color={color} onChange={onChange} style={{ width: '100%' }} />
      </Transition>
    </div>
  )
}
