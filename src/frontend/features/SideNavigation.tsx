import { NavLink, useLocation } from 'react-router-dom'
import { IconLayersSubtract, IconLink, IconUserCircle } from '@tabler/icons'
import clsx from 'clsx'
import { OneLinkIcon } from '@/components'

export const SideNavigation = () => {
  const { pathname } = useLocation()

  const navLinks = [
    { to: '/admin/links', icon: <IconLink /> },
    { to: '/admin/about', icon: <IconUserCircle /> },
    { to: '/admin/look', icon: <IconLayersSubtract /> },
  ]

  return (
    <div className="h-full w-full bg-white py-8 px-2 text-black">
      <div className="mb-8 flex justify-center">
        <OneLinkIcon width={36} />
      </div>

      <div className="flex flex-col items-center gap-1">
        {navLinks.map(({ to, icon }) => {
          const active = to === pathname

          return (
            <NavLink key={to} to={to}>
              <div
                className={clsx(
                  'rounded-primary stroke-1 py-2.5 px-6',
                  'hover:bg-secondary hover:text-white',
                  active ? 'bg-secondary text-white' : 'bg-transparent text-black'
                )}
              >
                {icon}
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
