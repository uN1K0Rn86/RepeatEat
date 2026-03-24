import { useMutation } from '@tanstack/react-query'
import type { CreateMealPlanPayload } from '@repeateat/shared'

import mealPlanService from '../services/mealPlans'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'
import type { AxiosError } from 'axios'
import type { BackendError } from './useHousehold'

export const useCreateMealPlan = () => {
  const { t } = useTranslation(['household'])
  return useMutation({
    mutationFn: (payload: CreateMealPlanPayload) =>
      mealPlanService.createMealPlan(payload),
    onSuccess: () => {
      notify.success(t('household:meal_plan_created'))
    },
    onError: (error: AxiosError<BackendError>) => {
      const serverMessage =
        error.response?.data?.error || 'errors:something_wrong'
      notify.error(t(serverMessage))
    },
  })
}
