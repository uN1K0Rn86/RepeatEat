import { create } from 'zustand'

import {
  createNotificationSlice,
  type NotificationSlice,
} from './slices/notificationSlice'
import { createAppSlice, type AppSlice } from './slices/appSlice'
import {
  createHouseholdSlice,
  type HouseholdSlice,
} from './slices/householdSlice'

type StoreState = NotificationSlice & AppSlice & HouseholdSlice

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createNotificationSlice(...a),
  ...createAppSlice(...a),
  ...createHouseholdSlice(...a),
}))
