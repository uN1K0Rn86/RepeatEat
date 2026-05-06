import type {
  BaseMealPlan,
  CreateMealPlanPayload,
  EditMealPlanPayload,
  MealPlan,
  MealPlanResponse,
} from '@repeateat/shared'
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

const getMealPlans = async (householdId: number): Promise<MealPlan[]> => {
  const response = await axios.get<MealPlan[]>(
    `${baseUrl}/${householdId}/meal-plans`,
  )
  return response.data
}

const updateMealPlan = async (
  payload: EditMealPlanPayload,
): Promise<BaseMealPlan> => {
  const response = await axios.put<BaseMealPlan>(
    `${baseUrl}/${payload.mealPlanToUpdate.householdId}/meal-plans/${payload.mealPlanToUpdate.id}`,
    payload,
  )
  return response.data
}

export default { createMealPlan, getMealPlans, updateMealPlan }
