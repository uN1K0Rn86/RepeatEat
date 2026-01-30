import { useEffect } from 'react'
import { authClient } from '@/utils/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useBoundStore } from '../../store'
import { loginSchema, type LoginInput } from '@repeateat/shared'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { FieldGroup, Field, FieldLabel, FieldError } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'

const LoginView = () => {
  const { setPageTitle, setUser } = useBoundStore()
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'notify'])

  useEffect(() => {
    setPageTitle('login')
  }, [setPageTitle])

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (loginData: LoginInput) => {
    const { data, error } = await authClient.signIn.email({
      email: loginData.email,
      password: loginData.password,
      rememberMe: false,
    })

    if (error) {
      form.setError('root', {
        message: error.message || t('common:login_failed'),
      })
    }

    if (data) {
      setUser(data.user)
      notify.success(t('notify:login', { username: data.user.name }))
      void navigate('/')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>{t('common:login')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                    <FieldLabel htmlFor="email-input">
                      {t('common:email')}
                    </FieldLabel>
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
                    <FieldLabel htmlFor="password-input">
                      {t('common:password')}
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password-input"
                      aria-invalid={fieldState.invalid}
                      type="password"
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
            <Button type="submit" form="login-form">
              {t('common:login')}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginView
