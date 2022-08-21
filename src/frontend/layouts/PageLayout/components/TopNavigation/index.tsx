import { useNavigate } from 'react-router-dom'
import { FilledButton, Flex, OneLinkIcon, OneLinkTextIcon, OutlineButton, TopBar } from '@/components'
import { useAuthStore, useIsAuthQuery, useLogout } from '@/store'

export const TopNavigation = () => {
  const { data: isAuth } = useIsAuthQuery()
  const { mutate: logout } = useLogout()
  const login = useAuthStore((state) => state.login)

  const navigate = useNavigate()

  const onAdminClick = () => navigate('/admin/links')

  return (
    <TopBar>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="3">
          <OneLinkIcon />
          <OneLinkTextIcon />
        </Flex>

        {!isAuth ? (
          <FilledButton color="secondary" onClick={() => login(async () => navigate('admin/links'))}>
            Login
          </FilledButton>
        ) : (
          <Flex gap="2">
            <OutlineButton onClick={onAdminClick}>Admin</OutlineButton>
            <FilledButton color="secondary" onClick={() => logout()}>
              Logout
            </FilledButton>
          </Flex>
        )}
      </Flex>
    </TopBar>
  )
}
