import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { inviteBaseSchema } from '@repeateat/shared'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { InfoProps } from './HouseholdInfo'
import { useInviteMember, useUserSearch } from '@/hooks/useHousehold'
import { useDebounce } from '@/hooks/useDebounce'

const AddMemberForm = ({ household }: InfoProps) => {
  const { t } = useTranslation(['household', 'errors'])
  const [userSearch, setUserSearch] = useState<string>('')
  const debouncedSearch = useDebounce(userSearch, 400)
  const [error, setError] = useState<string | null>(null)
  const inviteMemberMutation = useInviteMember()
  const searchedUsers = useUserSearch(debouncedSearch)

  // TODO: Render searchedUsers for autocomplete

  const handleInputChange = (value: string) => {
    setUserSearch(value)

    if (error) {
      const result = inviteBaseSchema.safeParse({ email: value })
      if (result.success) {
        setError(null)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = inviteBaseSchema.safeParse({ email: userSearch })

    if (!result.success) {
      const errorKey = result.error.issues[0].message
      setError(t(errorKey))
      return
    }

    setError(null)

    inviteMemberMutation.mutate(
      {
        householdId: household.householdId,
        email: userSearch,
      },
      {
        onSuccess: () => setUserSearch(''),
      },
    )
  }

  console.log(searchedUsers)

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Field>
        <FieldLabel>{t('household:invite_to_household')}</FieldLabel>
        <div className="flex flex-row gap-2">
          <div>
            <Input
              value={userSearch}
              onChange={(e) => handleInputChange(e.target.value)}
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
