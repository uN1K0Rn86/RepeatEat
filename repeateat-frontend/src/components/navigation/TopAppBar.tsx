import { Link } from 'react-router-dom'

import { useBoundStore } from '../../store'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import RecipeDropdownMenu from './RecipeDropdownMenu'
import { useTranslation } from 'react-i18next'
import UserDropdownMenu from './UserDropdownMenu'
import { useTheme } from '@/hooks/useTheme'
import { useMe } from '@/hooks/useUser'
import UserInvites from '../views/UserProfile/UserInvites'

const TopAppBar = () => {
  const { data: user } = useMe()
  const { pageTitle } = useBoundStore()
  const { t } = useTranslation(['common', 'notify'])
  const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="flex h-16 items-center px-4 justify-between max-w-screen-2xl mx-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="relative h-10 w-10 border-2">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" forceMount>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {t('common:theme')}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  {t('common:light')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  {t('common:dark')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  {t('common:system')}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <RecipeDropdownMenu />
          </DropdownMenuContent>
        </DropdownMenu>
        <h1 className="font-bold">{t(`common:${pageTitle}`)}</h1>

        {user ? (
          <div className="flex flex-row items-center gap-2">
            {user.invites && user.invites.length > 0 && (
              <UserInvites user={user} />
            )}
            <UserDropdownMenu user={user} />
          </div>
        ) : (
          <div className="flex gap-2">
            <Button asChild variant="secondary" data-testid="login-nav">
              <Link to="/login">{t('common:login')}</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default TopAppBar
