import { Navigate, Outlet } from 'react-router-dom'
import { Flex, LoadingData, SubH2 } from '@/components'
import { ClaimForm } from '@/features'
import { AdminLayout, BlankLayout } from '@/layouts'
import { useIsAuthQuery, useLinkQuery, useNameQuery, useUserQuery } from '@/store'

export const AdminRoutes = () => {
  const { data: isAuth, isLoading: isLoadingAuth } = useIsAuthQuery()
  const { data: user, isFetching: isLoadingUser } = useUserQuery()
  const { isLoading: isLoadingName } = useNameQuery()
  const { isLoading: isLoadingLinks } = useLinkQuery()

  if (isLoadingAuth || isLoadingUser || isLoadingName || isLoadingLinks)
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
