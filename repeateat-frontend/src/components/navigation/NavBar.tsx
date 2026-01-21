import { useNavigate, useLocation } from 'react-router-dom'

import NavButton from './NavButton'
import { Home } from 'lucide-react'

const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
      </div>
    </nav>
  )
}

export default NavBar
