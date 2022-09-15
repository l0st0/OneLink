import React from 'react'
import { TopNavigation } from '@/features'

export const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="relative my-0 mx-auto w-full max-w-7xl py-0 px-5">
      <div className="sticky top-8 right-0 z-50 mb-8">
        <TopNavigation />
      </div>
      {children}
    </div>
  )
}
