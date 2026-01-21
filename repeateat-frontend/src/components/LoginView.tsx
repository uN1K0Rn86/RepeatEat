import { useEffect, useState } from 'react'
import { authClient } from '../utils/auth-client'

import Input from './Input'
import Spinner from './ui/spinner'
import { Button } from './ui/button'
import { notify } from '../utils/notify'
import { useBoundStore } from '../store'
import { useNavigate } from 'react-router-dom'

const LoginView = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const setPageTitle = useBoundStore((state) => state.setPageTitle)

  useEffect(() => {
    setPageTitle('Login')
  }, [setPageTitle])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: false,
    })

    if (error) {
      console.log(error)
      setError(error.message || 'Login failed')
      notify.error('Login failed')
    } else {
      notify.success(`Logged in as ${data.user.name}`)
      void useBoundStore.getState().checkAuth()
      void navigate('/')
    }
    setLoading(false)
    console.log(data)
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100dvh-64px)] p-4">
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-2">
        <div className="grid grid-cols-[80px_2fr] gap-2 items-center max-w-sm">
          <Input
            label="Email: "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password: "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="flex justify-center">
          <Button type="submit" variant={'secondary'} className="w-22">
            {loading ? <Spinner /> : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginView
