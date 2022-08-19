import create from 'zustand'
import { Response, User } from '@/types'
import service from '../services'

interface UserState {
  user?: Response<User>
  getUser: () => Promise<User | undefined>
}

export const useUserStore = create<UserState>((set) => ({
  getUser: async () => {
    const user = await service.getUser()
    set({ user })
    return user.ok
  },
}))
