import { Outlet } from 'react-router-dom'
import { PageLayout } from '@/layouts'

export const BasicRoute = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}
