import { Navigate, Outlet } from 'react-router-dom'
import { useAdminPrefetch } from 'src/frontend/store/queries/useAdminPrefetch'
import { Flex, LoadingData, SubH2 } from '@/components'
import { ClaimForm } from '@/features'
import { AdminLayout, BlankLayout } from '@/layouts'
import { useAboutQuery, useIsAuthQuery, useUserQuery } from '@/store'

export const AdminRoutes = () => {
  const { isAuth, isLoading: isLoadingAuth } = useIsAuthQuery()
  const { user, isFetching: isLoadingUser } = useUserQuery()
  useAboutQuery()
  useAdminPrefetch()

  if (isLoadingAuth || isLoadingUser)
    return (
      <BlankLayout gap="4">
        <LoadingData />
      </BlankLayout>
    )

  if (!isAuth || !user) return <Navigate to="/" />

  if (!user.hasName)
    return (
      <BlankLayout>
        <Flex direction="column" align="flex-start">
          <SubH2>Pick the name to continue</SubH2>
          <ClaimForm maxWidth="100%" />
        </Flex>
      </BlankLayout>
    )

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
