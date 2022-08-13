import { Outlet } from 'react-router-dom'
import { PageLayout } from '@/layouts'

export const BasicRoutes = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}
