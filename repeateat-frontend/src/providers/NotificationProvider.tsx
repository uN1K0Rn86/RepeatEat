import { useReducer } from 'react'

import { NotificationContext } from '../contexts/NotificationContext'
import type { NotificationState, NotificationAction } from '../types'

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case 'ADD':
      return {
        notifications: [...state.notifications, action.payload],
      }

    case 'REMOVE':
      return {
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload.id,
        ),
      }

    case 'CLEAR':
      return { notifications: [] }

    default:
      return state
  }
}

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, notificationDispatch] = useReducer(
    notificationReducer,
    {
      notifications: [],
    },
  )

  return (
    <NotificationContext value={{ notifications, notificationDispatch }}>
      {children}
    </NotificationContext>
  )
}

export default NotificationProvider
