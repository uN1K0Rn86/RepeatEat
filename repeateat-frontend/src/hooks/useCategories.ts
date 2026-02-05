import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/services/recipes'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  })
}
