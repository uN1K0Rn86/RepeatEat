import { useNavigate } from 'react-router-dom'

import NavButton from './NavButton'
import { Home, NotepadText } from 'lucide-react'
import { useBoundStore } from '@/store'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const navigate = useNavigate()
  const { pageTitle } = useBoundStore()
  const { t } = useTranslation(['common'])

  const isActive = (tabName: string) => pageTitle === tabName

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200/10 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-screen-sm mx-auto">
        <NavButton
          icon={<Home size={20} />}
          label={t('common:home')}
          active={isActive('home')}
          onClick={() => void navigate('/')}
        />
        <NavButton
          icon={<NotepadText size={20} />}
          label={t('common:recipes')}
          active={isActive('recipes')}
          onClick={() => void navigate('/recipe')}
        />
      </div>
    </nav>
  )
}

export default NavBar
