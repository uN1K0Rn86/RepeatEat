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

const TopAppBar = () => {
  const { user, pageTitle } = useBoundStore()
  const navigate = useNavigate()

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          const { clearAuth } = useBoundStore.getState()
          clearAuth()
          notify.success(`User ${user?.name} logged out`)
          void navigate('/')
        },
      },
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-700">
      <div className="flex h-16 items-center px-4 justify-between max-w-screen-2xl mx-auto">
        <h1 className="font-bold">{pageTitle}</h1>

        {user ? (
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
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => void logOut()}
                className="text-destructive focus:text-destructive"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link to="/register">Register</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default TopAppBar
