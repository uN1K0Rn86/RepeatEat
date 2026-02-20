import { useMutation, useQueryClient } from '@tanstack/react-query'
import inviteService from '@/services/invites'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'
import type { Invite } from '@repeateat/shared'
import type { AxiosError } from 'axios'
import type { BackendError } from './useHousehold'

export const useAcceptInvite = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation(['household', 'errors'])

  return useMutation({
    mutationFn: (invite: Invite) => inviteService.acceptInvite(invite),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
      await queryClient.invalidateQueries({ queryKey: ['userHouseholds'] })
      notify.success(
        t('household:invite_accepted', { household: data.household.name }),
      )
    },
    onError: (error: AxiosError<BackendError>) => {
      console.error(error)
      const serverMessage = error.response?.data?.error || 'errors:wrong_invite'
      notify.error(t(serverMessage))
    },
  })
}
