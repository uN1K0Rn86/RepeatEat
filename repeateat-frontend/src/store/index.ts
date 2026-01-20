import { create } from 'zustand'

import { createNotificationSlice } from './slices/notificationSlice'
import type { NotificationSlice } from './slices/notificationSlice'

type StoreState = NotificationSlice

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createNotificationSlice(...a),
}))
