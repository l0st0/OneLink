import { Switch as HSwitch } from '@headlessui/react'
import clsx from 'clsx'

export interface SwitchProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  active?: boolean
}

export const Switch = ({ id, active = true, checked, onChange }: SwitchProps) => {
  return (
    <HSwitch
      id={id}
      checked={checked}
      onChange={onChange}
      className="group relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full"
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-full w-full rounded-md bg-transparent"
      />
      <span
        aria-hidden="true"
        className={clsx(
          active && checked ? 'bg-primary' : 'bg-gray',
          'pointer-events-none absolute mx-auto h-5 w-9 rounded-full transition-colors duration-200 ease-in-out'
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          checked ? 'translate-x-6' : 'translate-x-1',
          'border-gray-200 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out'
        )}
      />
    </HSwitch>
  )
}
