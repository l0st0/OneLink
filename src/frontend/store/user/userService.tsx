import { useNameClient } from '@/hooks'
import { AuthClient } from '@dfinity/auth-client'

export const getUser = async () => {
  const client = await useNameClient()
  return await client.getUser()
}

export const getIsAuth = async () => {
  const authClient = await AuthClient.create()
  return await authClient.isAuthenticated()
}

const userService = { getUser, getIsAuth }

export default userService
