import { Link, useNavigate } from 'react-router-dom'

import { authClient } from '../../utils/auth-client'
import { useBoundStore } from '../../store'
import { notify } from '../../utils/notify'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Menu } from 'lucide-react'
import RecipeDropdownMenu from '../views/recipe/RecipeDropdownMenu'
import ThemeToggle from '../ThemeToggle'
import { useTranslation } from 'react-i18next'

const TopAppBar = () => {
  const { user, pageTitle } = useBoundStore()
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'notify'])

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          const { clearAuth } = useBoundStore.getState()
          clearAuth()
          notify.success(t('notify:logout', { username: user?.name }))
          void navigate('/')
        },
      },
    })
  }

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
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    {user.image && (
                      <AvatarImage src={user.image} alt={user.name} />
                    )}
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none truncate">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void navigate('/profile')}>
                  {t('common:profile')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void logOut()}
                  className="text-destructive focus:text-destructive"
                >
                  {t('common:logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>
        ) : (
          <div className="flex gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link to="/register">{t('common:register')}</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link to="/login">{t('common:login')}</Link>
            </Button>
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  )
}

export default TopAppBar
