import { useState } from 'react'
import { authClient } from '../utils/auth-client'

const LoginView = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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
    }
    console.log(data)
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

export default LoginView
