import type { StateCreator } from 'zustand'

export interface HouseholdSlice {
  activeHouseholdId: number | null
  setActiveHouseholdId: (id: number) => void
}

export const createHouseholdSlice: StateCreator<HouseholdSlice> = (set) => ({
  activeHouseholdId: null,
  setActiveHouseholdId: (id: number) => set({ activeHouseholdId: id }),
})
