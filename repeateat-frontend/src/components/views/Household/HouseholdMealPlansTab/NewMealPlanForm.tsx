import { useOutletContext } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type UserHousehold,
  type CreateMealPlanFormValues,
  type CreateMealPlanPayload,
  createMealPlanSchema,
} from '@repeateat/shared'
import { Controller, useForm } from 'react-hook-form'

import { useHouseholdRecipes } from '@/hooks/useHousehold'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useTranslation } from 'react-i18next'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import DatePicker from '@/components/ui/DatePicker'
import { toDate } from '@/utils/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useCreateMealPlan } from '@/hooks/useMealPlan'

const NewMealPlanForm = () => {
  const { t } = useTranslation(['common', 'household'])
  const { household } = useOutletContext<{ household: UserHousehold }>()
  const {
    data: householdRecipes,
    isLoading,
    isError,
  } = useHouseholdRecipes(household.householdId)

  const newMealPlanMutation = useCreateMealPlan()

  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 7)

  const methods = useForm<CreateMealPlanFormValues>({
    resolver: zodResolver(createMealPlanSchema),
    defaultValues: {
      householdRecipes: [],
      recipeAmount: 3,
      name: '',
      startDate: new Date(),
      endDate,
      preference: 'balanced',
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  if (!householdRecipes) return <div>Cannot find recipes</div>

  const recipesForMealPlan = householdRecipes.map((r) => r.recipe)

  const onSubmit = (data: CreateMealPlanFormValues) => {
    const payload: CreateMealPlanPayload = {
      ...data,
      householdRecipes: recipesForMealPlan,
      householdId: household.householdId,
    }

    newMealPlanMutation.mutate(payload)
  }

  return (
    <AccordionItem value="mealPlan-form">
      <AccordionTrigger className="font-bold">
        {t('household:new_meal_plan')}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FieldGroup className="flex flex-row">
            <Field>
              <FieldLabel htmlFor="mealplan-name">
                {t('common:name')}
              </FieldLabel>
              <Input
                {...methods.register('name')}
                id="mealplan-name"
                required
              />
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
              <FieldError>{methods.formState.errors.name?.message}</FieldError>
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
            <FieldError>
              {methods.formState.errors.preference?.message}
            </FieldError>
          </Field>
          <FieldGroup>
            <Button type="submit">{t('common:create')}</Button>
          </FieldGroup>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}

export default NewMealPlanForm
