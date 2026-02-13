import axios from 'axios'

import type {
  AddRecipe,
  Category,
  FullRecipe,
  RecipeResponse,
  UpdateRecipe,
} from '@repeateat/shared'

const baseUrl = '/api/recipe'

const getRecipeDetails = async (recipeId: string): Promise<FullRecipe> => {
  const response = await axios.get<FullRecipe>(`${baseUrl}/${recipeId}`)
  return response.data
}

const getAllRecipes = async (): Promise<FullRecipe[]> => {
  const response = await axios.get<FullRecipe[]>(baseUrl)
  return response.data
}

const createRecipe = async (newRecipe: AddRecipe): Promise<RecipeResponse> => {
  const response = await axios.post<RecipeResponse>(baseUrl, newRecipe)
  return response.data
}

const editRecipe = async (
  recipeToEdit: UpdateRecipe,
): Promise<RecipeResponse> => {
  const response = await axios.put<RecipeResponse>(
    `${baseUrl}/${recipeToEdit.id}`,
    recipeToEdit,
  )
  return response.data
}

const deleteRecipe = async (recipeId: number): Promise<number> => {
  const response = await axios.delete<void>(`${baseUrl}/${recipeId}`)
  return response.status
}

const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(`${baseUrl}/category`)
  return data
}

export default {
  getRecipeDetails,
  getAllRecipes,
  createRecipe,
  editRecipe,
  deleteRecipe,
  getCategories,
}
