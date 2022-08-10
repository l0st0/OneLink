import { useNavigate } from 'react-router-dom'
import { FillButton, Flex, OneLinkIcon, OneLinkTextIcon, OutlineButton } from '@/components'
import { useAppDispatch, useAppSelector, useIdentity } from '@/hooks'
import { TopBarContent } from './styles'
import { getUser } from '@/store/user/userSlice'

export const TopBar = () => {
  const { isAuth, user } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogin = async () => {
    const identity = await useIdentity(dispatch)
    const onScc = async () => await dispatch(getUser())
    return await identity.login(onScc)
  }

  const onLogout = async () => {
    const identity = await useIdentity(dispatch)
    return await identity.logout()
  }

  const onAdminClick = () => navigate('/admin')

  return (
    <TopBarContent>
      <Flex alignItems="center" gap="3">
        <OneLinkIcon />
        <OneLinkTextIcon />
      </Flex>

      {!isAuth ? (
        <FillButton variant="secondary" onClick={onLogin}>
          Login
        </FillButton>
      ) : (
        <Flex gap="2">
          {user?.hasName && <OutlineButton onClick={onAdminClick}>Admin</OutlineButton>}
          <FillButton variant="secondary" onClick={onLogout}>
            Logout
          </FillButton>
        </Flex>
      )}
    </TopBarContent>
  )
}
