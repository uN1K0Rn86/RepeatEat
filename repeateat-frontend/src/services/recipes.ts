import axios from 'axios'

import type { AddRecipe, Category, RecipeResponse } from '@repeateat/shared'

const baseUrl = '/api/recipe'

const createRecipe = async (newRecipe: AddRecipe): Promise<RecipeResponse> => {
  const response = await axios.post<RecipeResponse>(baseUrl, newRecipe)
  return response.data
}

const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(`${baseUrl}/category`)
  return data
}

export default { createRecipe, getCategories }
