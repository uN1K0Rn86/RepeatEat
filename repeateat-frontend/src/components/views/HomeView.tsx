import { useEffect } from 'react'

import { useBoundStore } from '@/store'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import { usePlatform } from '@/hooks/usePlatform'
import InstallPopover from './InstallPopover'

const HomeView = () => {
  const setPageTitle = useBoundStore((state) => state.setPageTitle)
  const { t } = useTranslation(['common'])
  const navigate = useNavigate()
  const { canInstall, install } = useInstallPrompt()
  const os = usePlatform()

  useEffect(() => {
    setPageTitle('home')
  }, [t, setPageTitle])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <h1 className="text-4xl font-bold">{t('common:hero_title')}</h1>
      <img src="/favicon-96x96.png" alt="icon" />
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
      {canInstall && (
        <p className="text-muted-foreground max-w-sm">
          {t('common:install_description')}
        </p>
      )}
      {canInstall && os === 'android' && (
        <Button type="button" onClick={install}>
          {t('common:install')}
        </Button>
      )}
      {os === 'IOS' && <InstallPopover />}
    </div>
  )
}

export default HomeView
