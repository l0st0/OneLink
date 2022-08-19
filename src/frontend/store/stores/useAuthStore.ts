import { AuthClient } from '@dfinity/auth-client'
import create from 'zustand'
import { LOCAL_II_CANISTER } from '@/utils'
import { useUserStore } from '.'
import service from '../services'

interface AuthState {
  isAuth: boolean
  logout: () => Promise<void>
  login: (onSccFunc?: any) => Promise<void>
  getIsAuth: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: true,

  getIsAuth: async () => {
    const isAuth = await service.getIsAuth()
    set({ isAuth })
    return isAuth
  },
  logout: async () => {
    const authClient = await AuthClient.create()
    await authClient.logout()
    useUserStore.setState({ user: undefined })
    set({ isAuth: false })
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
      onError: async () => {
        set({ isAuth: false })
      },
      identityProvider,
      maxTimeToLive,
    })
  },
}))
