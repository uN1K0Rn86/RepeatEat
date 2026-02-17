import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { inviteSchema } from '@repeateat/shared'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AddMemberForm = () => {
  const { t } = useTranslation(['household', 'errors'])
  const [userSearch, setUserSearch] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = inviteSchema.safeParse({ email: userSearch })
    console.log('Invited')

    if (!result.success) {
      console.log(result.error.issues, typeof result.error)
      const errorKey = result.error.issues[0].message
      setError(t(errorKey))
      return
    }

    setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Field>
        <FieldLabel>{t('household:invite_to_household')}</FieldLabel>
        <div className="flex flex-row gap-2">
          <div>
            <Input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="email@email.com"
              aria-invalid={!!error}
            />
            {error && <FieldError>{error}</FieldError>}
          </div>
          <Button type="submit" disabled={!userSearch.trim()}>
            {t('household:invite')}
          </Button>
        </div>
      </Field>
    </form>
  )
}

export default AddMemberForm
