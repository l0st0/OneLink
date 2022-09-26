import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface AvatarProps {
  className?: string
}

export const AvatarText = ({ children, className }: React.PropsWithChildren<AvatarProps>) => (
  <div
    className={twMerge(
      clsx(
        'flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white text-4xl font-bold uppercase text-black',
        className
      )
    )}
  >
    {children}
  </div>
)

export const AvatarImage = ({
  children,
  className,
  ...rest
}: React.PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>>) => (
  <img {...rest} className={twMerge(clsx('h-12 w-12 rounded-[50%]', className))}>
    {children}
  </img>
)
