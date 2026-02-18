import { useQuery } from '@tanstack/react-query'

import userService from '@/services/users'

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: userService.me,
    staleTime: Infinity,
    retry: false,
  })
}
