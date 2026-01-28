import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { authClient } from '../../utils/auth-client'
import { useBoundStore } from '@/store'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Controller, useForm } from 'react-hook-form'
import { type RegisterInput, registerSchema } from '@repeateat/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldGroup, Field, FieldLabel, FieldError } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { notify } from '@/utils/notify'

const RegisterView = () => {
  const { setPageTitle, setUser } = useBoundStore()
  const navigate = useNavigate()

  useEffect(() => {
    setPageTitle('Register')
  }, [setPageTitle])

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  })

  const onSubmit = async (values: RegisterInput) => {
    const { email, password, name } = values
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    })

    if (error) {
      form.setError('root', {
        message: error.message || 'Registration failed',
      })
    }

    if (data) {
      setUser(data.user)
      notify.success(`Registration successful. Welcome ${data.user.name}!`)
      void navigate('/')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
            {form.formState.errors.root && (
              <div className="bg-destructive/15 text-destructive text-sm font-medium p-3 rounded-md mb-4">
                {form.formState.errors.root.message}
              </div>
            )}
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email-input">Email:</FieldLabel>
                    <Input
                      {...field}
                      id="email-input"
                      aria-invalid={fieldState.invalid}
                      placeholder="Write your email here"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password-input">Password:</FieldLabel>
                    <Input
                      {...field}
                      id="password-input"
                      aria-invalid={fieldState.invalid}
                      placeholder="Password must be at least 8 characters"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmpassword-input">
                      Confirm password:
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirmpassword-input"
                      aria-invalid={fieldState.invalid}
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username-input">Username:</FieldLabel>
                    <Input
                      {...field}
                      id="username-input"
                      aria-invalid={fieldState.invalid}
                      placeholder="Select your username"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="register-form">
              Register
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterView
