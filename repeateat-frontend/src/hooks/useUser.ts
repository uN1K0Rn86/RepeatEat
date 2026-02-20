import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import userService from '@/services/users'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authClient } from '@/utils/auth-client'
import { notify } from '@/utils/notify'

import type { LoginInput } from '@repeateat/shared'
import type { UseFormSetError } from 'react-hook-form'
import type { User } from 'better-auth'

export const useMe = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: userService.me,
    staleTime: Infinity,
    retry: false,
  })
}

export const useLogin = (setError: UseFormSetError<LoginInput>) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation(['notify', 'common'])

  return useMutation({
    mutationFn: async (loginData: LoginInput) => {
      const response = await authClient.signIn.email({
        email: loginData.email,
        password: loginData.password,
        rememberMe: false,
      })

      if (response.error) throw new Error(response.error.message)

      return response.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'me'], data.user)
      notify.success(t('notify:login', { username: data.user.name }))
      void navigate('/')
    },
    onError: (error) => {
      setError('root', {
        message: error.message || t('common:login_failed'),
      })
    },
  })
}

export const useLogout = (user: User) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation(['notify'])

  return useMutation({
    mutationFn: async () => {
      const response = await authClient.signOut()
      if (response.error) throw new Error(response.error.message)
      return response
    },
    onSuccess: () => {
      queryClient.clear()
      notify.success(t('notify:logout', { username: user.name }))
      void navigate('/')
    },
    onError: (error) => {
      notify.error(error.message || t('common:logout_failed'))
    },
  })
}
