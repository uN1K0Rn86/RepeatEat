import { useBoundStore } from '@/store'
import { useMutation } from '@tanstack/react-query'

import recipeService from '@/services/recipes'
import type { AddRecipe } from '@repeateat/shared'

export const useCreateRecipe = () => {
  const { user } = useBoundStore()

  return useMutation({
    mutationFn: (newRecipe: AddRecipe) => {
      if (!user) throw new Error('User not found')
      return recipeService.createRecipe(newRecipe)
    },
  })
}
