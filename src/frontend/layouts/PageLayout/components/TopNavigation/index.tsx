import { useNavigate } from 'react-router-dom'
import { FilledButton, Flex, OneLinkIcon, OneLinkTextIcon, OutlineButton, TopBar } from '@/components'
import { useMainStore } from '@/store'

export const TopNavigation = () => {
  const isAuth = useMainStore((state) => state.isAuth)
  const login = useMainStore((state) => state.login)
  const logout = useMainStore((state) => state.logout)

  const navigate = useNavigate()

  const onLogin = async () => {
    const onScc = async () => navigate('/admin/links')
    return await login(onScc)
  }

  const onAdminClick = () => navigate('/admin/links')

  return (
    <TopBar>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="3">
          <OneLinkIcon />
          <OneLinkTextIcon />
        </Flex>

        {!isAuth ? (
          <FilledButton color="secondary" onClick={onLogin}>
            Login
          </FilledButton>
        ) : (
          <Flex gap="2">
            <OutlineButton onClick={onAdminClick}>Admin</OutlineButton>
            <FilledButton color="secondary" onClick={logout}>
              Logout
            </FilledButton>
          </Flex>
        )}
      </Flex>
    </TopBar>
  )
}
