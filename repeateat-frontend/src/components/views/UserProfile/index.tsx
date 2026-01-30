import { useEffect } from 'react'
import { useBoundStore } from '@/store'
import { Button } from '../../ui/button'
import LanguagePicker from './LanguagePicker'
import { useTranslation } from 'react-i18next'

const UserProfile = () => {
  const { user, setPageTitle } = useBoundStore()
  const { t } = useTranslation(['nav', 'user', 'common'])

  useEffect(() => {
    setPageTitle('profile')
  }, [t, setPageTitle])

  if (!user) return <div>{t('user:login_prompt')}</div>

  return (
    <div>
      <div className="flex gap-4">
        <div>
          {t('common:name')}: {user.name}
        </div>
        <Button onClick={() => alert('Coming')} variant={'secondary'}>
          {t('common:modify')}
        </Button>
      </div>
      <LanguagePicker />
    </div>
  )
}

export default UserProfile
