import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { AdminLayout, BlankLayout } from '@/layouts'
import { Flex, Paragraph, Spinner, SubH2 } from '@/components'
import { getUser } from '@/store/user/userSlice'
import { createName, getName } from '@/store/name/nameSlice'
import { ClaimForm, onClaimClickParameters } from '../ClaimForm'

export const AdminRoutes = () => {
  const [loading, setLoading] = React.useState(true)
  const [claimLoading, setClaimLoading] = React.useState(false)
  const [needName, setNeedName] = React.useState(false)

  const { isAuth } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const initLoad = async () => {
    const { ok: user } = await dispatch(getUser()).unwrap()
    const primaryName = user?.names.find((n) => n.primary)?.name

    if (!primaryName) {
      setLoading(false)
      return setNeedName(true)
    }

    await dispatch(getName(primaryName))
    setLoading(false)
  }

  React.useEffect(() => {
    initLoad()
  }, [])

  const onClaimClick = async ({ event, input }: onClaimClickParameters) => {
    event.preventDefault()
    setClaimLoading(true)

    await dispatch(createName(input))

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
