import type { StateCreator } from 'zustand'

export interface AppSlice {
  pageTitle: string
  setPageTitle: (title: string) => void
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  pageTitle: 'Home',
  setPageTitle: (title) => set({ pageTitle: title }),
})
