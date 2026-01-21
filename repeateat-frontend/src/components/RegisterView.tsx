import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { authClient } from '../utils/auth-client'
import { useBoundStore } from '@/store'
import Input from './Input'
import Spinner from './ui/spinner'
import { Button } from './ui/button'

const RegisterView = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const setPageTitle = useBoundStore((state) => state.setPageTitle)

  useEffect(() => {
    setPageTitle('Register')
  }, [setPageTitle])

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      return alert('Passwords do not match')
    }

    setLoading(true)

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: '/',
      },
      {
        onSuccess: async () => {
          await navigate('/')
        },
        onError: (ctx) => {
          alert(ctx.error.message)
        },
      },
    )

    setLoading(false)

    if (error) {
      console.log(error)
      setError(error.message || 'Registration failed')
    }
    console.log(data)
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100dvh-64px)] p-4">
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-2">
        <div className="grid grid-cols-[80px_1fr] gap-2 items-center max-w-sm">
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
          <Input
            label="Confirm password: "
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Input
            label="Username: "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-destructive text-sm font-medium">{error}</p>
        )}

        <div className="flex justify-center">
          <Button type="submit" variant={'secondary'} className="w-22">
            {loading ? <Spinner /> : 'Register'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterView
