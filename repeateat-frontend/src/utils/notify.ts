import { useBoundStore } from '../store'

export const notify = {
  success: (msg: string) =>
    useBoundStore.getState().addNotification('success', msg),
  error: (msg: string) =>
    useBoundStore.getState().addNotification('error', msg),
  info: (msg: string) => useBoundStore.getState().addNotification('info', msg),
  warning: (msg: string) =>
    useBoundStore.getState().addNotification('warning', msg),
}
