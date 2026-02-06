import recipeService from '@/services/recipes'
import { useQuery } from '@tanstack/react-query'

import { type FullRecipe } from '@repeateat/shared'

export const useRecipe = (recipeId: string) => {
  return useQuery<FullRecipe>({
    queryKey: ['recipe', recipeId],
    queryFn: () => recipeService.getRecipeDetails(recipeId),
  })
}
