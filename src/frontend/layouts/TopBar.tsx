import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface TopBarProps {
  theme?: 'dark' | 'light'
}

export const TopBar = ({ children, theme = 'light' }: React.PropsWithChildren<TopBarProps>) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-primary py-2 px-6',
          theme === 'light' ? 'bg-white text-black' : 'bg-secondary text-white'
        )
      )}
    >
      {children}
    </div>
  )
}
