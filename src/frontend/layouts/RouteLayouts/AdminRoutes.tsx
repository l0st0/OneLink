import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Flex, Paragraph, Spinner, SubH2 } from '@/components'
import { ClaimForm, onClaimClickParameters } from '@/features'
import { AdminLayout, BlankLayout } from '@/layouts'
import { useAuthStore, useNameStore, useUserStore } from '@/store'

export const AdminRoutes = () => {
  const [loading, setLoading] = React.useState(true)
  const [claimLoading, setClaimLoading] = React.useState(false)
  const [needName, setNeedName] = React.useState(false)

  const isAuth = useAuthStore((state) => state.isAuth)
  const getUser = useUserStore((state) => state.getUser)
  const getName = useNameStore((state) => state.getName)
  const createName = useNameStore((state) => state.createName)

  const initLoad = async () => {
    const user = await getUser()
    const primaryName = user?.names.find((n) => n.primary)?.name

    if (!primaryName) {
      setLoading(false)
      return setNeedName(true)
    }

    await getName(primaryName)
    setLoading(false)
  }

  React.useEffect(() => {
    initLoad()
  }, [])

  const onClaimClick = async ({ event, input, result }: onClaimClickParameters) => {
    event.preventDefault()

    if (!result.claim) return
    setClaimLoading(true)

    await createName(input)

    setClaimLoading(false)
    setNeedName(false)
  }

  if (!isAuth) return <Navigate to="/" />

  if (loading)
    return (
      <BlankLayout gap="4">
        <Spinner size="10" />
        <Paragraph>Loading data...</Paragraph>
      </BlankLayout>
    )

  if (needName)
    return (
      <BlankLayout>
        <Flex direction="column" align="flex-start">
          <SubH2>Pick the name to continue</SubH2>
          <ClaimForm onClaimClick={onClaimClick} loading={claimLoading} maxWidth="100%" />
        </Flex>
      </BlankLayout>
    )

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
