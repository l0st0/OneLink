import isEqual from 'lodash/isEqual'
import create from 'zustand'
import { Controller, Link, Look, Profile } from '@/types'
import service from '../services'
import { useUserStore } from './useUserStore'

interface NameState {
  name: string
  links: Link[]
  profile?: Profile
  localProfile?: Profile
  look?: Look
  controllers: Controller[]
  isUpdating: boolean
  err?: string
  getName: (n: string) => Promise<void>
  createName: (n: string) => Promise<void>
  updateLinks: (l: Link[]) => Promise<void>
  updateLocalProfile: (p: Profile) => void
  saveProfile: (p: Profile) => Promise<Profile | void>
}

export const useNameStore = create<NameState>((set, get) => ({
  name: '',
  links: [],
  controllers: [],
  isUpdating: false,

  getName: async (n) => {
    const { ok, err } = await service.getName(n)

    if (!ok) return set({ err })
    set({ ...ok, localProfile: ok.profile })
  },
  createName: async (n) => {
    const { ok, err } = await service.createName(n)

    if (!ok) return set({ err })
    const { user, name } = ok

    useUserStore.setState({ user: { ok: user } })
    set({ ...name, localProfile: name.profile })
  },
  updateLinks: async (l) => {
    if (isEqual(get().links, l)) return

    set({ isUpdating: true })
    const { ok: links, err } = await service.updateLinks(get().name, l)

    set({ isUpdating: false })
    if (!links) return set({ err })
    set({ links })
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
