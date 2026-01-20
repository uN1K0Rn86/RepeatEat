import type { NotificationAction } from '../types'

export const notify = {
  success: (dispatch: React.Dispatch<NotificationAction>, message: string) =>
    dispatch({
      type: 'ADD',
      payload: {
        id: crypto.randomUUID(),
        message,
        type: 'success',
      },
    }),

  error: (dispatch: React.Dispatch<NotificationAction>, message: string) =>
    dispatch({
      type: 'ADD',
      payload: {
        id: crypto.randomUUID(),
        message,
        type: 'error',
      },
    }),
}
