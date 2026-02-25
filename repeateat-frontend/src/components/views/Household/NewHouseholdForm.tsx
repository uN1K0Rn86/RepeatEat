import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { householdBaseSchema } from '@repeateat/shared'
import { useCreateHousehold } from '@/hooks/useHousehold'

const NewHouseholdForm = () => {
  const { t } = useTranslation(['household', 'common'])
  const [householdName, setHouseholdName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const newHouseholdMutation = useCreateHousehold()

  const handleInputChange = (value: string) => {
    setHouseholdName(value)

    if (error) {
      const result = householdBaseSchema.safeParse({ name: value })
      if (result.success) {
        setError(null)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = householdBaseSchema.safeParse({ name: householdName })

    if (!result.success) {
      const errorKey = result.error.issues[0].message
      setError(t(errorKey))
      return
    }
    setError(null)

    newHouseholdMutation.mutate(householdName)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="flex flex-col items-center gap-2">
        <CardTitle>{t('household:create')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Field>
            <FieldLabel htmlFor="household-name">
              {t('household:household_name')}
            </FieldLabel>
            <Input
              id="household-name"
              onChange={(e) => handleInputChange(e.target.value)}
            />
            {error && <FieldError>{error}</FieldError>}
            <Button type="submit" className="max-w-30">
              {t('common:create')}
            </Button>
          </Field>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewHouseholdForm
