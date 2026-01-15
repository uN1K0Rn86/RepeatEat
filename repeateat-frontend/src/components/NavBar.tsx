import { useNavigate } from 'react-router-dom'
import { authClient } from '../utils/auth-client'

import Button from './Button'

const NavBar = () => {
  const navigate = useNavigate()

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          void navigate('/')
        },
      },
    })
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-screen-sm mx-auto px-4">
      <Button onClick={() => void navigate('/')}>Home</Button>
      <Button onClick={() => void navigate('/login')}>Login</Button>
      <Button onClick={() => void navigate('/register')}>Register</Button>
      <Button onClick={() => void navigate('/profile')}>Profile</Button>
      <Button onClick={() => void logOut()}>Log out</Button>
    </div>
  )
}

export default NavBar
