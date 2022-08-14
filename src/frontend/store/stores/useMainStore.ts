import { AuthClient } from '@dfinity/auth-client'
import create from 'zustand'
import { Link, Name, User } from '@/types'
import { LOCAL_II_CANISTER } from '@/utils'
import { defaultName } from '../defaultValues'
import service from '../services'

interface MainState {
  user?: User
  isAuth: boolean
  name: Name
  isUpdating: boolean
  err?: string
  logout: () => Promise<void>
  login: (onSccFunc?: any) => Promise<void>
  getUser: () => Promise<User | undefined>
  getIsAuth: () => Promise<void>
  getName: (n: string) => Promise<void>
  createName: (n: string) => Promise<void>
  updateLinks: (n: string, links: Link[]) => Promise<void>
}

export const useMainStore = create<MainState>((set) => ({
  user: undefined,
  isAuth: true,
  name: defaultName,
  isUpdating: false,
  err: undefined,

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
  getName: async (n) => {
    const { ok: name, err } = await service.getName(n)
    set({ name, err })
  },
  createName: async (n) => {
    const { ok, err } = await service.createName(n)
    if (!ok) return set({ err })
    const { user, name } = ok
    set({ name, user })
  },
  updateLinks: async (n, l) => {
    set({ isUpdating: true })
    const { ok: links, err } = await service.updateLinks(n, l)
    if (!links) return set({ err, isUpdating: false })
    set((state) => ({ name: { ...state.name, links }, err, isUpdating: false }))
  },
}))
