import axios from 'axios'

import type { AddRecipe, Category, RecipeResponse } from '@repeateat/shared'
import type { User } from 'better-auth'

const baseUrl = '/api/recipe'

const createRecipe = async (
  newRecipe: AddRecipe,
  user: User,
): Promise<RecipeResponse> => {
  const recipeForDb = {
    name: newRecipe.name,
    authorId: user.id,
  }
  const response = await axios.post<RecipeResponse>(baseUrl, recipeForDb)
  return response.data
}

const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(`${baseUrl}/category`)
  return data
}

export default { createRecipe, getCategories }
