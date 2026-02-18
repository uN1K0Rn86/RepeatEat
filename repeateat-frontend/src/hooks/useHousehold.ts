import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import householdService from '@/services/households'
import { type UserHousehold } from '@repeateat/shared'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'

export const useUserHouseholds = () => {
  return useQuery<UserHousehold[]>({
    queryKey: ['userHouseholds'],
    queryFn: householdService.getUserHouseholds,
  })
}

export const useInviteMember = () => {
  const { t } = useTranslation(['errors'])
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: householdService.inviteHouseholdMember,
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: ['households', variables.householdId],
      })
    },
    onError: (error: any) => {
      console.log(error)
      const serverMessage =
        error.response?.data?.error || 'errors:something_wrong'
      notify.error(t(serverMessage))
    },
  })
}
