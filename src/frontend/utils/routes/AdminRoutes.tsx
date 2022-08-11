import { useAppSelector } from '@/hooks'
import { AdminLayout } from '@/layouts'
import { Outlet, Navigate } from 'react-router-dom'

export const AdminRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.user)

  return isAuth ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to="/" />
  )
}
