import React from 'react'
import { RgbColorPicker } from 'react-colorful'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { getBrightness, rgbFromString, rgbToString } from '@/utils'
import { ColorButton } from '../components/ui'

interface ColorButtonWithPalleteProps {
  color: string
  onChange: (newColor: string) => void
  label?: string
}

export const ColorButtonWithPallete = ({ color, onChange, label = '' }: ColorButtonWithPalleteProps) => {
  const [open, setOpen] = React.useState(false)

  const rgbColor = React.useMemo(() => rgbFromString(color), [color])

  const onButtonClick = () => setOpen((prev) => !prev)

  return (
    <div className="flex flex-col gap-4">
      <ColorButton
        onClick={onButtonClick}
        className={clsx(getBrightness(rgbColor) > 128 ? 'text-black' : 'text-white', 'hover:outline-white')}
        style={{ background: color }}
      >
        {label}
      </ColorButton>
      <Transition
        show={open}
        enter="transition-opacity ease-linear duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <RgbColorPicker
          color={rgbColor}
          onChange={(newColor) => onChange(rgbToString(newColor))}
          style={{ width: '100%' }}
        />
      </Transition>
    </div>
  )
}
