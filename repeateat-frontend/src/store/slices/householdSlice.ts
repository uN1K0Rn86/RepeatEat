import type { StateCreator } from 'zustand'

export interface HouseholdSlice {
  activeHouseholdId: number | null
  setActiveHouseholdId: (id: number | null) => void
}

export const createHouseholdSlice: StateCreator<HouseholdSlice> = (set) => ({
  activeHouseholdId: null,
  setActiveHouseholdId: (id: number | null) => set({ activeHouseholdId: id }),
})
