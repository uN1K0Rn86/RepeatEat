import { useMutation, useQueryClient } from '@tanstack/react-query'

import recipeService from '@/services/recipes'
import type { UpdateRecipe } from '@repeateat/shared'

export const useEditRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (recipeToEdit: UpdateRecipe) => {
      return recipeService.editRecipe(recipeToEdit)
    },
    onSuccess: async (data) => {
      console.log('Recipe edited')
      await queryClient.invalidateQueries({
        queryKey: ['recipe', data.id.toString()],
      })
      await queryClient.invalidateQueries({
        queryKey: ['recipes'],
      })
    },
  })
}
