import { AuthClient } from '@dfinity/auth-client'
import create from 'zustand'
import { LOCAL_II_CANISTER } from '@/utils'

interface AuthState {
  login: (onSccFunc?: any) => Promise<void>
}

export const useAuthStore = create<AuthState>(() => ({
  login: async (onScc) => {
    const authClient = await AuthClient.create()
    const identityProvider = import.meta.env.PROD ? 'https://identity.ic0.app/#authorize' : LOCAL_II_CANISTER
    const maxTimeToLive = BigInt(24 * 60 * 60 * 1000000000)

    await authClient.login({
      onSuccess: async () => onScc && (await onScc()),
      identityProvider,
      maxTimeToLive,
    })
  },
}))
