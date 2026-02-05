import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/services/recipes'

import type { Category } from '@repeateat/shared'

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  })
}
