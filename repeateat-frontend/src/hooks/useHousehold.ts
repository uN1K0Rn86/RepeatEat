import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import householdService from '@/services/households'
import {
  type CookLogFromFrontend,
  type HouseholdRecipe,
  type HouseholdRecipeResponse,
  type InviteResponse,
  type UserHousehold,
} from '@repeateat/shared'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'
import type { AxiosError } from 'axios'

export interface BackendError {
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

export const useUserSearch = (debouncedSearch: string) => {
  const { data } = useQuery({
    queryKey: ['user-search', debouncedSearch],
    queryFn: () => householdService.searchUser(debouncedSearch),
    enabled: debouncedSearch.length > 2,
  })

  return data
}

export const useAddHouseholdRecipe = () => {
  const { t } = useTranslation(['errors', 'notify'])
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: householdService.addRecipeToHousehold,
    onSuccess: (response: HouseholdRecipeResponse, variables) => {
      notify.success(t(response.message))
      return queryClient.invalidateQueries({
        queryKey: ['householdRecipes', variables.householdId],
      })
    },
    onError: (error: AxiosError<BackendError>) => {
      const serverMessage =
        error.response?.data?.error || 'errors:recipe_add_household_fail'
      notify.error(t(serverMessage))
    },
  })
}

export const useHouseholdRecipes = (householdId: number | null | undefined) => {
  return useQuery<HouseholdRecipe[]>({
    queryKey: ['householdRecipes', householdId],
    queryFn: () => householdService.getHouseholdRecipes(householdId!),
    enabled: typeof householdId === 'number',
    select: (data) =>
      data.map((r) => ({
        ...r,
        recipe: {
          ...r.recipe,
          cookingHistory: r.recipe.cookingHistory.map((log) => ({
            ...log,
            cookedAt: log.cookedAt ? new Date(log.cookedAt) : undefined,
          })),
        },
      })),
  })
}

export const useCreateHousehold = () => {
  const { t } = useTranslation(['errors', 'notify'])
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name: string) => householdService.createHousehold(name),
    onSuccess: () => {
      notify.success(t('notify:household_created'))
      return queryClient.invalidateQueries({ queryKey: ['userHouseholds'] })
    },
    onError: (error: AxiosError<BackendError>) => {
      const serverMessage =
        error.response?.data?.error || 'errors:something_wrong'
      notify.error(t(serverMessage))
    },
  })
}

export const useLogCook = () => {
  const { t } = useTranslation(['errors', 'notify'])
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CookLogFromFrontend) =>
      householdService.createCookLog(data),
    onSuccess: () => {
      notify.success(t('notify:cooklog_created'))
      return queryClient.invalidateQueries({ queryKey: ['householdRecipes'] })
    },
    onError: (error: AxiosError<BackendError>) => {
      const serverMessage =
        error.response?.data?.error || 'errors:something_wrong'
      notify.error(t(serverMessage))
    },
  })
}
