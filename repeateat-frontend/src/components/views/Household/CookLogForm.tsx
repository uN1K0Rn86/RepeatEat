import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import DatePicker from '@/components/ui/DatePicker'
import { useTranslation } from 'react-i18next'
import {
  type CookLogFromFrontend,
  cookLogFromFrontendSchema,
  type HouseholdRecipe,
} from '@repeateat/shared'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogCook } from '@/hooks/useHousehold'

interface LogFormProps {
  recipe: HouseholdRecipe
}

const CookLogForm = ({ recipe }: LogFormProps) => {
  const { t } = useTranslation(['common', 'household'])
  const methods = useForm<CookLogFromFrontend>({
    resolver: zodResolver(cookLogFromFrontendSchema),
    defaultValues: {
      householdId: recipe.householdId,
      recipeId: recipe.recipeId,
      notes: '',
      cookedAt: new Date(),
    },
  })
  const cookLogMutation = useLogCook()

  const onSubmit = (data: CookLogFromFrontend) => {
    cookLogMutation.mutate(data, {
      onSuccess: () => {
        methods.reset()
      },
    })
  }

  return (
    <form
      className="flex flex-row p-2 gap-2 justify-between items-stretch border-2 rounded-md"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <Textarea
        {...methods.register('notes')}
        placeholder={t('common:notes')}
      />
      <div className="flex flex-col gap-2">
        <Controller
          control={methods.control}
          name="cookedAt"
          render={({ field }) => (
            <DatePicker date={field.value} setDate={field.onChange} />
          )}
        />
        <Button type="submit">{t('household:log_cook')}</Button>
      </div>
    </form>
  )
}

export default CookLogForm
