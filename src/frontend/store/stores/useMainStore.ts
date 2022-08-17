import isEqual from 'lodash/isEqual'
import { AuthClient } from '@dfinity/auth-client'
import create from 'zustand'
import { Link, Profile, User } from '@/types'
import { LOCAL_II_CANISTER } from '@/utils'
import service from '../services'

interface MainState {
  user?: User
  isAuth: boolean
  name: string
  links: Link[]
  profile?: Profile
  localProfile?: Profile
  isUpdating: boolean
  err?: string
  logout: () => Promise<void>
  login: (onSccFunc?: any) => Promise<void>
  getUser: () => Promise<User | undefined>
  getIsAuth: () => Promise<void>
  getName: (n: string) => Promise<void>
  createName: (n: string) => Promise<void>
  updateLinks: (l: Link[]) => Promise<void>
  updateLocalProfile: (p: Profile) => void
  saveProfile: (p: Profile) => Promise<Profile | void>
}

export const useMainStore = create<MainState>((set, get) => ({
  isAuth: true,
  name: '',
  links: [],
  isUpdating: false,

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
    const { ok, err } = await service.getName(n)

    if (!ok) return set({ err })
    const { links, profile, name } = ok

    set({ name, links, profile, localProfile: profile })
  },
  createName: async (n) => {
    const { ok, err } = await service.createName(n)

    if (!ok) return set({ err })
    const { user, name: nameObj } = ok
    const { links, profile, name } = nameObj

    set({ user, name, links, profile, localProfile: profile })
  },
  updateLinks: async (l) => {
    if (isEqual(get().links, l)) return
    set({ isUpdating: true })
    const { ok: links, err } = await service.updateLinks(get().name, l)
    set({ isUpdating: false })

    if (!links) return set({ err })
    set({ links, err })
  },
  updateLocalProfile: (localProfile) => {
    set({ localProfile })
  },
  saveProfile: async (p) => {
    if (isEqual(p, get().profile)) return

    set({ isUpdating: true })
    const { ok: profile, err } = await service.updateProfile(get().name, p)
    set({ isUpdating: false })

    if (!profile) return set({ err })
    set({ profile, localProfile: profile, err })

    return profile
  },
}))
