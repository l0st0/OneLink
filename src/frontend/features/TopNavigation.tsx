import { useNavigate } from 'react-router-dom'
import { FilledButton, OneLinkIcon, OneLinkTextIcon, OutlineButton } from '@/components'
import { TopBar } from '@/layouts'
import { useAuthStore, useIsAuthQuery, useLogout } from '@/store'

export const TopNavigation = () => {
  const { isAuth } = useIsAuthQuery()
  const { logout } = useLogout()
  const login = useAuthStore((state) => state.login)

  const navigate = useNavigate()

  const onAdminClick = () => navigate('/admin/links')

  return (
    <TopBar>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <OneLinkIcon />
          <OneLinkTextIcon />
        </div>

        {!isAuth ? (
          <FilledButton color="secondary" onClick={() => login(async () => navigate('admin/links'))}>
            Login
          </FilledButton>
        ) : (
          <div className="flex gap-2">
            <OutlineButton onClick={onAdminClick}>Admin</OutlineButton>
            <FilledButton color="secondary" onClick={() => logout()}>
              Logout
            </FilledButton>
          </div>
        )}
      </div>
    </TopBar>
  )
}
