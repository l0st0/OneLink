import create from 'zustand'
import { About } from '@/types'

interface AboutState {
  localAbout?: About
  setLocalAbout: (about: About) => About
}

export const useAboutStore = create<AboutState>((set) => ({
  setLocalAbout: (localAbout) => {
    set({ localAbout })
    return localAbout
  },
}))
