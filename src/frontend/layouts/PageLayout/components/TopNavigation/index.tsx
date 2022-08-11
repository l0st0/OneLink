import { useNavigate } from 'react-router-dom'
import { FilledButton, Flex, OneLinkIcon, OneLinkTextIcon, OutlineButton, TopBar } from '@/components'
import { useAppDispatch, useAppSelector, useIdentity } from '@/hooks'

export const TopNavigation = () => {
  const { isAuth } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogin = async () => {
    const identity = await useIdentity(dispatch)
    return await identity.login()
  }

  const onLogout = async () => {
    const identity = await useIdentity(dispatch)
    return await identity.logout()
  }

  const onAdminClick = () => navigate('/admin')

  return (
    <TopBar>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="3">
          <OneLinkIcon />
          <OneLinkTextIcon />
        </Flex>

        {!isAuth ? (
          <FilledButton variant="secondary" onClick={onLogin}>
            Login
          </FilledButton>
        ) : (
          <Flex gap="2">
            <OutlineButton onClick={onAdminClick}>Admin</OutlineButton>
            <FilledButton variant="secondary" onClick={onLogout}>
              Logout
            </FilledButton>
          </Flex>
        )}
      </Flex>
    </TopBar>
  )
}
