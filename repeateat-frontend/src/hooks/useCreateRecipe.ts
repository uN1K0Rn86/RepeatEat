import { useMutation } from '@tanstack/react-query'

import recipeService from '@/services/recipes'
import type { AddRecipe } from '@repeateat/shared'
import { useMe } from './useUser'

export const useCreateRecipe = () => {
  const { data: user } = useMe()

  return useMutation({
    mutationFn: (newRecipe: AddRecipe) => {
      if (!user) throw new Error('User not found')
      return recipeService.createRecipe(newRecipe)
    },
  })
}
