import { useNavigate } from 'react-router-dom'
import { authClient } from '../utils/auth-client'

const NavBar = () => {
  const logOut = async () => await authClient.signOut()
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '10em',
      }}
    >
      <button onClick={() => void navigate('/')}>Home</button>
      <button onClick={() => void navigate('/register')}>Register</button>
      <button onClick={() => logOut}>Log out</button>
    </div>
  )
}

export default NavBar
