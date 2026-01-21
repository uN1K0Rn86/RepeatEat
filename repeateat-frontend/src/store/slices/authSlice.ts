import type { StateCreator } from 'zustand'
import type { User } from 'better-auth'

import userService from '../../services/users'

export interface AuthSlice {
  user: User | null
  isLoading: boolean
  checkAuth: () => Promise<void>
  clearAuth: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  isLoading: true,

  checkAuth: async () => {
    try {
      const userInfo = await userService.me()
      set({ user: userInfo, isLoading: false })
    } catch {
      set({ user: null, isLoading: false })
    }
  },

  clearAuth: () => set({ user: null }),
})
