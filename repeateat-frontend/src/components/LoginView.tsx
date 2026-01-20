import { useState } from 'react'
import { authClient } from '../utils/auth-client'

import Input from './Input'
import useNotification from '../hooks/useNotification'
import { notify } from '../utils/notify'

const LoginView = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { notificationDispatch } = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    console.log('signing in')
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
      rememberMe: false,
    })

    setLoading(false)

    if (error) {
      console.log(error)
      setError(error.message || 'Login failed')
      notify.error(notificationDispatch, 'Login failed')
    } else {
      notify.success(notificationDispatch, `Logged in as ${data.user.name}`)
    }

    console.log(data)
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)}>
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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

export default LoginView
