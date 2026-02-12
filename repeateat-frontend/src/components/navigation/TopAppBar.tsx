import { Link } from 'react-router-dom'

import { useBoundStore } from '../../store'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import RecipeDropdownMenu from './RecipeDropdownMenu'
import ThemeToggle from '../ThemeToggle'
import { useTranslation } from 'react-i18next'
import UserDropdownMenu from './UserDropdownMenu'

const TopAppBar = () => {
  const { user, pageTitle } = useBoundStore()
  const { t } = useTranslation(['common', 'notify'])

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="flex h-16 items-center px-4 justify-between max-w-screen-2xl mx-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="relative h-10 w-10 border-2">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          {pageTitle === 'recipes' && <RecipeDropdownMenu />}
        </DropdownMenu>
        <h1 className="font-bold">{t(`common:${pageTitle}`)}</h1>

        {user ? (
          <UserDropdownMenu user={user} />
        ) : (
          <div className="flex gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link to="/register">{t('common:register')}</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link to="/login">{t('common:login')}</Link>
            </Button>
          </div>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}

export default TopAppBar
