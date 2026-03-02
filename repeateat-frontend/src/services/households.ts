import {
  type CookLog,
  type CookLogFromFrontend,
  type HouseholdRecipe,
  type HouseholdRecipeResponse,
  type HouseholdResponse,
  type InviteResponse,
  type RemovedHouseholdRecipe,
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

const removeRecipeFromHousehold = async ({
  householdId,
  recipeId,
}: {
  householdId: number
  recipeId: number
}): Promise<RemovedHouseholdRecipe> => {
  const response = await axios.delete<RemovedHouseholdRecipe>(
    `${baseUrl}/${householdId}/recipes/${recipeId}`,
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

const createCookLog = async (data: CookLogFromFrontend): Promise<CookLog> => {
  console.log('here')
  const response = await axios.post<CookLog>(
    `${baseUrl}/${data.householdId}/cooking-history`,
    data,
  )

  return response.data
}

export default {
  getUserHouseholds,
  inviteHouseholdMember,
  searchUser,
  addRecipeToHousehold,
  removeRecipeFromHousehold,
  getHouseholdRecipes,
  createHousehold,
  createCookLog,
}
