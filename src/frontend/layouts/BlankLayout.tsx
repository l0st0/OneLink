import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const BlankLayout = ({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
  <div className={twMerge(clsx('flex h-screen flex-col items-center justify-center', className))}>
    {children}
  </div>
)
