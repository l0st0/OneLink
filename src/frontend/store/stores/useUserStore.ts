import { AuthClient } from '@dfinity/auth-client'
import create from 'zustand'
import { User } from '@/types'
import { LOCAL_II_CANISTER } from '@/utils'
import service from '../services'

interface UserState {
  user?: User
  isAuth: boolean
  err?: string
  logout: () => Promise<void>
  login: (onSccFunc?: any) => Promise<void>
  getUser: () => Promise<User | undefined>
  getIsAuth: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  isAuth: true,

  getIsAuth: async () => {
    const isAuth = await service.getIsAuth()
    set({ isAuth })
  },
  logout: async () => {
    const authClient = await AuthClient.create()
    await authClient.logout()

    set({ user: undefined, isAuth: false })
  },
  login: async (onSccFunc) => {
    const authClient = await AuthClient.create()
    const identityProvider = import.meta.env.PROD ? 'https://identity.ic0.app/#authorize' : LOCAL_II_CANISTER
    const maxTimeToLive = BigInt(24 * 60 * 60 * 1000000000)

    await authClient.login({
      onSuccess: async () => {
        set({ isAuth: true })
        if (onSccFunc) await onSccFunc()
      },
      onError: async (error) => {
        set({ isAuth: false })
        console.log('error', error)
      },
      identityProvider,
      maxTimeToLive,
    })
  },
  getUser: async () => {
    const { ok: user, err } = await service.getUser()
    set({ user, err })
    return user
  },
}))
