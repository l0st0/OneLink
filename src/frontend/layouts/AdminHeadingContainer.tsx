import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const AdminHeadingContainer = ({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
  <div className={twMerge(clsx('mb-8 flex flex-col items-center gap-1', className))}>{children}</div>
)
