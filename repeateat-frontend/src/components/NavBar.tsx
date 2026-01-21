import { useNavigate, useLocation } from 'react-router-dom'
import { authClient } from '../utils/auth-client'
import NavButton from './NavButton'
import { Home, LogIn, UserPlus, User, LogOut } from 'lucide-react'
import { useBoundStore } from '../store'
import { notify } from '../utils/notify'

const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          const user = useBoundStore.getState().user
          useBoundStore.getState().clearAuth()
          notify.success(`User ${user?.name} logged out`)
          void navigate('/')
        },
      },
    })
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-inherit border-t border-gray-200/10 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-screen-sm mx-auto">
        <NavButton
          icon={<Home size={20} />}
          label="Home"
          active={isActive('/')}
          onClick={() => void navigate('/')}
        />

        <NavButton
          icon={<LogIn size={20} />}
          label="Login"
          active={isActive('/login')}
          onClick={() => void navigate('/login')}
        />

        <NavButton
          icon={<UserPlus size={20} />}
          label="Join"
          active={isActive('/register')}
          onClick={() => void navigate('/register')}
        />

        <NavButton
          icon={<User size={20} />}
          label="Profile"
          active={isActive('/profile')}
          onClick={() => void navigate('/profile')}
        />

        <NavButton
          icon={<LogOut size={20} />}
          label="Exit"
          onClick={() => void logOut()}
        />
      </div>
    </nav>
  )
}

export default NavBar
