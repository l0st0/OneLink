import { PageLayout } from '@/layouts'
import { Outlet } from 'react-router-dom'

export const BasicRoutes = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}
