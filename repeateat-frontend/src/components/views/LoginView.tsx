import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useBoundStore } from '../../store'
import { loginSchema, type LoginInput } from '@repeateat/shared'
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
import { useTranslation } from 'react-i18next'
import { useLogin } from '@/hooks/useUser'

const LoginView = () => {
  const { setPageTitle } = useBoundStore()
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
  const { mutate: login, isPending } = useLogin(form.setError)

  const onSubmit = (loginData: LoginInput) => {
    login(loginData)
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
            <Button type="submit" form="login-form" disabled={isPending}>
              {t('common:login')}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginView
