import React from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { AdminLayout } from '@/layouts'
import { Flex, Paragraph, Spinner } from '@/components'
import { getUser } from '@/store/user/userSlice'
import { getName } from '@/store/name/nameSlice'

export const AdminRoutes = () => {
  const [loading, setLoading] = React.useState(true)
  const { isAuth } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const initLoad = async () => {
    const { ok: user } = await dispatch(getUser()).unwrap()
    const primaryName = user?.names.find((n) => n.primary)
    if (!primaryName) return navigate('/')

    await dispatch(getName(primaryName.name))
    setLoading(false)
  }

  React.useEffect(() => {
    initLoad()
  }, [])

  if (!isAuth) return <Navigate to="/" />
  if (loading)
    return (
      <Flex gap="4" direction="column" justify="center" align="center" height="100vh">
        <Spinner size="10" />
        <Paragraph>Loading data...</Paragraph>
      </Flex>
    )

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
