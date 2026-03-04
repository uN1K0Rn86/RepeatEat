import { useEffect } from 'react'

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
import { useTranslation } from 'react-i18next'
import { useRegister } from '@/hooks/useUser'

const RegisterView = () => {
  const { setPageTitle } = useBoundStore()
  const { t } = useTranslation(['common'])

  useEffect(() => {
    setPageTitle('register')
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

  const { mutate: register, isPending } = useRegister(form.setError)

  const onSubmit = (values: RegisterInput) => {
    register(values)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{t('common:register')}</CardTitle>
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
                  <FieldLabel htmlFor="email-input">
                    {t('common:email')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email-input"
                    data-testid="email-input"
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
                    data-testid="password-input"
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
                    {t('common:confirm_password')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmpassword-input"
                    data-testid="confirmpassword-input"
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
                  <FieldLabel htmlFor="username-input">
                    {t('common:username')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="username-input"
                    data-testid="username-input"
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
            {isPending ? t('common:registering') : t('common:register')}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default RegisterView
