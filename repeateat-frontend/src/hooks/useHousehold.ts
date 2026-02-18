import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import householdService from '@/services/households'
import { type InviteResponse, type UserHousehold } from '@repeateat/shared'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'
import type { AxiosError } from 'axios'

interface BackendError {
  error: string
}

export const useUserHouseholds = () => {
  return useQuery<UserHousehold[]>({
    queryKey: ['userHouseholds'],
    queryFn: householdService.getUserHouseholds,
  })
}

export const useInviteMember = () => {
  const { t } = useTranslation(['errors', 'notify'])
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: householdService.inviteHouseholdMember,
    onSuccess: (response: InviteResponse, variables) => {
      console.log(response)
      notify.success(t(response.message))
      return queryClient.invalidateQueries({
        queryKey: ['households', variables.householdId],
      })
    },
    onError: (error: AxiosError<BackendError>) => {
      const serverMessage =
        error.response?.data?.error || 'errors:something_wrong'
      notify.error(t(serverMessage))
    },
  })
}
