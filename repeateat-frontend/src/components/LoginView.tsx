import { useState } from 'react'
import { authClient } from '../utils/auth-client'

import Input from './Input'
import Button from './Button'
import { notify } from '../utils/notify'

const LoginView = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    console.log('signing in')
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
    }

    console.log(data)
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-2">
      <div className="grid grid-cols-[1fr_2fr] gap-2 items-center max-w-sm">
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
        <Button>Login</Button>
      </div>
    </form>
  )
}

export default LoginView
