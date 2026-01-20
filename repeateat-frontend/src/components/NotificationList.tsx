import { useNotifications } from '../store/selectors'

import NotificationItem from './NotificationItem'

const NotificationList = () => {
  const notifications = useNotifications()

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3 w-[80%] max-w-sm">
      {notifications.map((n) => (
        <div key={n.id}>
          <NotificationItem notification={n} />
        </div>
      ))}
    </div>
  )
}

export default NotificationList
