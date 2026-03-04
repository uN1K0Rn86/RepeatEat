import { useEffect } from 'react'

import { useBoundStore } from '@/store'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const HomeView = () => {
  const setPageTitle = useBoundStore((state) => state.setPageTitle)
  const { t } = useTranslation(['common'])
  const navigate = useNavigate()

  useEffect(() => {
    setPageTitle('home')
  }, [t, setPageTitle])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <h1 className="text-4xl font-bold">{t('common:hero_title')}</h1>
      <p className="text-muted-foreground max-w-sm">
        {t('common:hero_description')}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate('/register')}>
          {t('common:get_started')}
        </Button>
        <Button variant="outline" onClick={() => navigate('/login')}>
          {t('common:login')}
        </Button>
      </div>
    </div>
  )
}

export default HomeView
