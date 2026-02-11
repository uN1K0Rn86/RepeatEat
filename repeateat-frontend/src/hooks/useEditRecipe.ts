import { useMutation } from '@tanstack/react-query'

import recipeService from '@/services/recipes'
import type { UpdateRecipe } from '@repeateat/shared'

export const useEditRecipe = () => {
  return useMutation({
    mutationFn: (recipeToEdit: UpdateRecipe) => {
      return recipeService.editRecipe(recipeToEdit)
    },
    onSuccess: () => {
      console.log('Recipe edited')
    },
  })
}
