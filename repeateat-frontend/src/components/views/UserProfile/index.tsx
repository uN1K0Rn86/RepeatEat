import { useEffect } from 'react'
import { useBoundStore } from '@/store'
import { Button } from '../../ui/button'
import LanguagePicker from './LanguagePicker'
import { useTranslation } from 'react-i18next'
import { useMe } from '@/hooks/useUser'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import DefaultHouseholdPicker from './DefaultHouseholdPicker'

const UserProfile = () => {
  const { setPageTitle } = useBoundStore()
  const { data: user } = useMe()
  const { t } = useTranslation(['nav', 'user', 'common'])

  useEffect(() => {
    setPageTitle('profile')
  }, [t, setPageTitle])

  if (!user) return <div>{t('user:login_prompt')}</div>

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{t('common:profile')}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-col gap-2 font-extrabold">
          {t('common:user_info')}
          <div className="flex flex-row gap-2 font-normal items-center">
            <div>
              {t('common:name')}: {user.name}
            </div>
            <Button onClick={() => alert('Coming')} variant={'secondary'}>
              {t('common:modify')}
            </Button>
          </div>
          <LanguagePicker />
          <DefaultHouseholdPicker />
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfile
