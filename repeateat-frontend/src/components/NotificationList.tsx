import useNotification from '../hooks/useNotification'
import NotificationItem from './NotificationItem'

const NotificationList = () => {
  const { notifications } = useNotification()

  if (notifications.notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-80">
      {notifications.notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationList
