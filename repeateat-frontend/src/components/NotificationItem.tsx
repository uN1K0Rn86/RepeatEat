import { X } from 'lucide-react'

import { useBoundStore } from '../store'
import type { Notification, NotificationType } from '@/types'

interface NotificationProps {
  notification: Notification
}

const NotificationItem = ({ notification }: NotificationProps) => {
  const typeStyles: Record<NotificationType, string> = {
    success: 'border-green-500 bg-green-50 text-green-800',
    error: 'border-red-500 bg-red-50 text-red-800',
    info: 'border-blue-500 bg-blue-50 text-blue-800',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
  }

  const removeNotification = useBoundStore((state) => state.removeNotification)

  return (
    <div
      className={`border-l-4 p-4 shadow-md rounded flex justify-between ${typeStyles[notification.type]}`}
    >
      <span>{notification.message}</span>
      <button
        className="text-gray-400 hover:text-gray-600 transition-colors"
        type="button"
        onClick={() => removeNotification(notification.id)}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default NotificationItem
