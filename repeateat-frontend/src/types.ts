export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export interface NotificationState {
  notifications: Notification[]
}

export type NotificationAction =
  | { type: 'ADD'; payload: Notification }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR' }
