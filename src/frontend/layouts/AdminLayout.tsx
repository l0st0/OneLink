import React from 'react'
import { Preview, SideNavigation } from '@/features'
import { useElementPosition } from '@/hooks'

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { topOffset } = useElementPosition({ ref })

  return (
    <div className="relative grid grid-cols-[min-content,1fr,min-content]">
      <div className="sticky top-0 left-0 z-50 h-screen">
        <SideNavigation />
      </div>

      <div
        ref={ref}
        className="flex w-full flex-col items-center overflow-y-auto overflow-x-hidden p-8"
        style={{ height: `calc(100vh - ${topOffset}px)` }}
      >
        {children}
      </div>

      <Preview />
    </div>
  )
}
