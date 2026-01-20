import { use } from 'react'

import { NotificationContext } from '../contexts/NotificationContext'

const useNotification = () => {
  const context = use(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    )
  }

  return context
}

export default useNotification
