import { Navigate, Outlet } from 'react-router-dom'
import { Flex, Paragraph, Spinner, SubH2 } from '@/components'
import { ClaimForm } from '@/features'
import { AdminLayout, BlankLayout } from '@/layouts'
import { useIsAuthQuery, useNameQuery, useUserQuery } from '@/store'

export const AdminRoutes = () => {
  const { data: isAuth, isLoading: isLoadingAuth } = useIsAuthQuery()
  const { data: user, isFetching: isLoadingUser } = useUserQuery()
  const { data: name, isFetching: isLoadingName } = useNameQuery()

  if (isLoadingAuth || isLoadingUser || isLoadingName)
    return (
      <BlankLayout gap="4">
        <Spinner size="10" />
        <Paragraph>Loading data...</Paragraph>
      </BlankLayout>
    )

  if (!isAuth || !user || !name) return <Navigate to="/" />

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
