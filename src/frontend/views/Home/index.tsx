import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, H1, IcBadgeIconFlat, SubH1 } from '@/components'
import { ClaimForm, onClaimClickParameters } from '@/features'
import { useAppDispatch, useIdentity } from '@/hooks'
import { createName } from '@/store/name/nameSlice'
import { getUser } from '@/store/user/userSlice'
import { userHasPrimaryName } from '@/utils'

export const Home = () => {
  const [loading, setLoading] = React.useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClaimClick = async ({ event, input, result, setResult }: onClaimClickParameters) => {
    event.preventDefault()

    const adminPath = '/admin/links'

    if (result.hasName) return navigate(adminPath)
    if (!result.claim) return

    setLoading(true)

    const { ok: actualUser } = await dispatch(getUser()).unwrap()

    if (actualUser) {
      if (!userHasPrimaryName(actualUser)) {
        await dispatch(createName(input))
        return navigate(adminPath)
      }

      setLoading(false)
      return setResult({ color: 'error', msg: 'You already have name.', claim: false, hasName: true })
    }

    const identity = await useIdentity(dispatch)

    const claimName = async () => {
      const { ok: user } = await dispatch(getUser()).unwrap()
      if (!userHasPrimaryName(user)) await dispatch(createName(input))

      setLoading(false)
      return navigate(adminPath)
    }

    identity.login(claimName)
  }

  return (
    <>
      <Flex gap="6" mt="20">
        <H1>You in one</H1>
        <H1 color="black" strokeColor="primary">
          link.
        </H1>
      </Flex>

      <Flex gap="6" mt="2">
        <SubH1>Created on Web3</SubH1> <IcBadgeIconFlat width={256} />
      </Flex>

      <ClaimForm onClaimClick={onClaimClick} loading={loading} />
    </>
  )
}
