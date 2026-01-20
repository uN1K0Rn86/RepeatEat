import { useBoundStore } from '.'

export const useNotifications = () =>
  useBoundStore((state) => state.notifications)
