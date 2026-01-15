import { useNavigate } from 'react-router-dom'
import { authClient } from '../utils/auth-client'

import Button from './Button'

const NavBar = () => {
  const logOut = async () => await authClient.signOut()
  const navigate = useNavigate()

  return (
    <div className="flex justify-center gap-[1em]">
      <Button onClick={() => void navigate('/')}>Home</Button>
      <Button onClick={() => void navigate('/register')}>Register</Button>
      <Button onClick={() => logOut}>Log out</Button>
    </div>
  )
}

export default NavBar
