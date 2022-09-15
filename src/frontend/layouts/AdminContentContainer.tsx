import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const AdminContentContainer = ({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
  <div className={twMerge(clsx('my-8 mx-auto flex w-full max-w-2xl flex-col items-center gap-4', className))}>
    {children}
  </div>
)
