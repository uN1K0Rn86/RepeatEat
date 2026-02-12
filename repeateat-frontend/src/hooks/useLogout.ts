import { authClient } from '@/utils/auth-client'
import { useBoundStore } from '@/store'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const { t } = useTranslation(['notify'])
  const navigate = useNavigate()
  const { user, clearAuth } = useBoundStore()

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          clearAuth()
          notify.success(t('notify:logout', { username: user?.name }))
          void navigate('/')
        },
      },
    })
  }

  return { logout }
}
