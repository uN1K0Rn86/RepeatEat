import axios from 'axios'

import type {
  AddRecipe,
  Category,
  FullRecipe,
  RecipeResponse,
} from '@repeateat/shared'

const baseUrl = '/api/recipe'

const getRecipeDetails = async (recipeId: string): Promise<FullRecipe> => {
  const response = await axios.get<FullRecipe>(`${baseUrl}/${recipeId}`)
  return response.data
}

const createRecipe = async (newRecipe: AddRecipe): Promise<RecipeResponse> => {
  const response = await axios.post<RecipeResponse>(baseUrl, newRecipe)
  return response.data
}

const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(`${baseUrl}/category`)
  return data
}

export default { getRecipeDetails, createRecipe, getCategories }
