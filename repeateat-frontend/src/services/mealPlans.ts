import type { CreateMealPlanPayload, MealPlanResponse } from '@repeateat/shared'
import axios from 'axios'

const baseUrl = '/api/household'

const createMealPlan = async (
  payload: CreateMealPlanPayload,
): Promise<MealPlanResponse> => {
  const response = await axios.post<MealPlanResponse>(
    `${baseUrl}/${payload.householdId}/meal-plans`,
    payload,
  )
  return response.data
}

export default { createMealPlan }
