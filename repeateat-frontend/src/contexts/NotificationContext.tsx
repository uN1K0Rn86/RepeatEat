import { createContext } from 'react'
import type { Dispatch } from 'react'

import type { NotificationState, NotificationAction } from '../types'

interface NotificationContextValue {
  notifications: NotificationState
  notificationDispatch: Dispatch<NotificationAction>
}

export const NotificationContext = createContext<
  NotificationContextValue | undefined
>(undefined)
