import { create } from 'zustand'

import {
  createNotificationSlice,
  type NotificationSlice,
} from './slices/notificationSlice'
import { createAuthSlice, type AuthSlice } from './slices/authSlice'
import { createAppSlice, type AppSlice } from './slices/appSlice'

type StoreState = NotificationSlice & AuthSlice & AppSlice

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createNotificationSlice(...a),
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
}))
