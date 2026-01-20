import { useEffect } from 'react'
import useNotification from '../hooks/useNotification'
import type { Notification } from '../types'

interface Props {
  notification: Notification
}

const NotificationItem = ({ notification }: Props) => {
  const { notificationDispatch } = useNotification()

  useEffect(() => {
    setTimeout(() => {
      notificationDispatch({
        type: 'REMOVE',
        payload: { id: notification.id },
      })
    }, 4000)
  }, [notificationDispatch, notification.id])

  const colorMap = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-600',
  }

  return (
    <div
      className={`rounded px-4 py-3 shadow-lg text-white flex items-center justify-between gap-4
        ${colorMap[notification.type ?? 'info']}`}
    >
      <span>{notification.message}</span>

      <button
        onClick={() =>
          notificationDispatch({
            type: 'REMOVE',
            payload: { id: notification.id },
          })
        }
        className="text-white/80 hover:text-white text-sm"
      >
        ✕
      </button>
    </div>
  )
}

export default NotificationItem
