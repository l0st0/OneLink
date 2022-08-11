import { useNameClient } from '@/hooks'
import { AuthClient } from '@dfinity/auth-client'

export const fetchUser = async () => {
  const client = await useNameClient()
  return await client.getUser()
}

export const fetchIsAuth = async () => {
  const authClient = await AuthClient.create()
  return await authClient.isAuthenticated()
}

const userService = { fetchUser, fetchIsAuth }

export default userService
