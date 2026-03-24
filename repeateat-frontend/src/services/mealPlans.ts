import type { CreateMealPlanPayload, MealPlan } from '@repeateat/shared'
import axios from 'axios'

const baseUrl = '/api/household'

const createMealPlan = async (
  payload: CreateMealPlanPayload,
): Promise<MealPlan> => {
  const response = await axios.post<MealPlan>(
    `${baseUrl}/${payload.householdId}/meal-plans`,
    payload,
  )
  return response.data
}

export default { createMealPlan }
