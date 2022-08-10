import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getName } from '@/store/name/nameSlice'

export const Admin = () => {
  const { user } = useAppSelector((state) => state.user)
  const { name } = useAppSelector((state) => state.name)

  const dispatch = useAppDispatch()

  const initLoad = async () => {
    const primaryName = user?.names.find((n) => n.primary)
    if (!primaryName) return

    dispatch(getName(primaryName.name))
  }

  React.useEffect(() => {
    if (!user) return
    initLoad()
  }, [user])

  console.log('name', name)
  console.log('user', user)

  return <div>{user?.names[0].name}</div>
}
