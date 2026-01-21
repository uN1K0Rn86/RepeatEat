import type { StateCreator } from 'zustand'
import type { Notification, NotificationType } from '../../types'

export interface NotificationSlice {
  notifications: Notification[]
  addNotification: (type: NotificationType, message: string) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const createNotificationSlice: StateCreator<NotificationSlice> = (
  set,
  get,
) => ({
  notifications: [],

  addNotification: (type: NotificationType, message: string) => {
    const id = crypto.randomUUID()
    set((state) => ({
      notifications: [...state.notifications, { id, type, message }],
    }))

    setTimeout(() => {
      get().removeNotification(id)
    }, 5000)
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
})
