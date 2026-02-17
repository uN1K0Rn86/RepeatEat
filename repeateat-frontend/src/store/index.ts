import { create } from 'zustand'

import {
  createNotificationSlice,
  type NotificationSlice,
} from './slices/notificationSlice'
import { createAuthSlice, type AuthSlice } from './slices/authSlice'
import { createAppSlice, type AppSlice } from './slices/appSlice'
import {
  createHouseholdSlice,
  type HouseholdSlice,
} from './slices/householdSlice'

type StoreState = NotificationSlice & AuthSlice & AppSlice & HouseholdSlice

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createNotificationSlice(...a),
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
  ...createHouseholdSlice(...a),
}))
