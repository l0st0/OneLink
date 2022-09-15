import React from 'react'

export const AvatarText = ({ children }: React.PropsWithChildren) => (
  <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white text-4xl font-bold uppercase text-black">
    {children}
  </div>
)

export const AvatarImage = ({
  children,
  ...rest
}: React.PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>>) => (
  <img {...rest} className="h-12 w-12 rounded-[50%]">
    {children}
  </img>
)
