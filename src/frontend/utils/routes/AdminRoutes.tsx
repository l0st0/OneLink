import { useAppSelector } from '@/hooks'
import { Outlet, Navigate } from 'react-router-dom'

export const AdminRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.user)

  return isAuth ? <Outlet /> : <Navigate to="/" />
}
