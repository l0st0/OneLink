import { AuthClient } from '@dfinity/auth-client'
import { setLogin, setLogout } from '@/store/user/userSlice'
import { LOCAL_II_CANISTER } from '@/utils'
import { AppDispatch } from '../store'

export const useIdentity = async (dispatch: AppDispatch) => {
  const authClient = await AuthClient.create()

  const login = async (onSuccessFunc?: any) => {
    const identityProvider = import.meta.env.PROD ? 'https://identity.ic0.app/#authorize' : LOCAL_II_CANISTER
    const maxTimeToLive = BigInt(24 * 60 * 60 * 1000000000)

    await authClient.login({
      onSuccess: async () => {
        dispatch(setLogin(true))
        if (onSuccessFunc) await onSuccessFunc()
      },
      onError: async (error) => {
        dispatch(setLogin(false))
        console.log('error', error)
      },
      identityProvider,
      maxTimeToLive,
    })
  }

  const logout = async () => {
    try {
      const authClient = await AuthClient.create()
      await authClient.logout()
      dispatch(setLogout())
    } catch (error) {
      console.log('error', error)
    }
  }

  return { logout, login }
}
