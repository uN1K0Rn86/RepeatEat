import { useQuery } from '@tanstack/react-query'
import householdService from '@/services/households'
import { type UserHousehold } from '@repeateat/shared'

export const useUserHouseholds = () => {
  return useQuery<UserHousehold[]>({
    queryKey: ['userHouseholds'],
    queryFn: householdService.getUserHouseholds,
  })
}
