import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from '@/components/ui/DatePicker'
import { useTranslation } from 'react-i18next'
import { toDate } from '@/utils/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { type CreateMealPlanFormValues } from '@repeateat/shared'

const MealPlanForm = () => {
  const { t } = useTranslation()
  const methods = useFormContext<CreateMealPlanFormValues>()

  return (
    <>
      <FieldGroup className="flex flex-row">
        <Field>
          <FieldLabel htmlFor="mealplan-name">{t('common:name')}</FieldLabel>
          <Input {...methods.register('name')} id="mealplan-name" required />
          <FieldError>{methods.formState.errors.name?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="recipe-amount">
            {t('household:recipe_amount')}
          </FieldLabel>
          <Input
            {...methods.register('recipeAmount', { valueAsNumber: true })}
            id="recipe-amount"
            type="number"
            required
          />
          <FieldError>
            {methods.formState.errors.recipeAmount?.message}
          </FieldError>
        </Field>
      </FieldGroup>
      <FieldGroup className="flex flex-row">
        <Field>
          <FieldLabel id="start-date-label" htmlFor="start-date-trigger">
            {t('household:start_date')}
          </FieldLabel>
          <Controller
            control={methods.control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                date={toDate(field.value)}
                setDate={field.onChange}
                id="start-date-label"
                ariaLabelledBy="start-date-trigger"
              />
            )}
          />
        </Field>
        <Field>
          <FieldLabel id="end-date-label" htmlFor="end-date-trigger">
            {t('household:end_date')}
          </FieldLabel>
          <Controller
            control={methods.control}
            name="endDate"
            render={({ field }) => (
              <DatePicker
                date={toDate(field.value)}
                setDate={field.onChange}
                id="end-date-label"
                ariaLabelledBy="end-date-trigger"
              />
            )}
          />
        </Field>
      </FieldGroup>
      <Field>
        <FieldLabel htmlFor="preference">
          {t('household:preference')}
        </FieldLabel>
        <Controller
          control={methods.control}
          name="preference"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('household:preference')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="balanced">
                    {t('household:balanced')}
                  </SelectItem>
                  <SelectItem value="random">
                    {t('household:random')}
                  </SelectItem>
                  <SelectItem value="favorites">
                    {t('household:favorites')}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError>{methods.formState.errors.preference?.message}</FieldError>
      </Field>
      <FieldGroup>
        <Button type="submit">{t('common:create')}</Button>
      </FieldGroup>
    </>
  )
}

export default MealPlanForm
