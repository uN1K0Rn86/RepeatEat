import {
  type HouseholdRecipe,
  type HouseholdRecipeResponse,
  type HouseholdResponse,
  type InviteResponse,
  type UserHousehold,
} from '@repeateat/shared'
import axios from 'axios'

const baseUrl = '/api/household'

const getUserHouseholds = async (): Promise<UserHousehold[]> => {
  const response = await axios.get<UserHousehold[]>(baseUrl)
  return response.data
}

const inviteHouseholdMember = async ({
  householdId,
  email,
}: {
  householdId: number
  email: string
}): Promise<InviteResponse> => {
  const response = await axios.post<InviteResponse>(
    `${baseUrl}/${householdId}/invites`,
    { email },
  )
  return response.data
}

const searchUser = async (query: string): Promise<string[]> => {
  const response = await axios.get<string[]>(`/api/user/search?q=${query}`)

  return response.data
}

const addRecipeToHousehold = async ({
  householdId,
  recipeId,
}: {
  householdId: number
  recipeId: string
}): Promise<HouseholdRecipeResponse> => {
  const response = await axios.post<HouseholdRecipeResponse>(
    `${baseUrl}/${householdId}/recipe`,
    { recipeId },
  )

  return response.data
}

const getHouseholdRecipes = async (
  householdId: number,
): Promise<HouseholdRecipe[]> => {
  const response = await axios.get<HouseholdRecipe[]>(
    `${baseUrl}/${householdId}/recipe`,
  )

  return response.data
}

const createHousehold = async (name: string): Promise<HouseholdResponse> => {
  const response = await axios.post<HouseholdResponse>(baseUrl, { name })

  return response.data
}

export default {
  getUserHouseholds,
  inviteHouseholdMember,
  searchUser,
  addRecipeToHousehold,
  getHouseholdRecipes,
  createHousehold,
}
