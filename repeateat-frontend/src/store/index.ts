import { create } from 'zustand'

import { createNotificationSlice } from './slices/notificationSlice'
import type { NotificationSlice } from './slices/notificationSlice'
import { createAuthSlice } from './slices/authSlice'
import type { AuthSlice } from './slices/authSlice'

type StoreState = NotificationSlice & AuthSlice

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createNotificationSlice(...a),
  ...createAuthSlice(...a),
}))
