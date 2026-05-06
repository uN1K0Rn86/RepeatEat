import {
  createMealPlanSchema,
  type CreateMealPlanFormValues,
  type UserHousehold,
} from '@repeateat/shared'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { useMealPlans } from '@/hooks/useMealPlan'
import { useHouseholdRecipes } from '@/hooks/useHousehold'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toDate } from '@/utils/form'

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/DatePicker'
import { useTranslation } from 'react-i18next'

const MealPlanDetailsView = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const mealPlanId = Number(id)
  const { household } = useOutletContext<{ household: UserHousehold | null }>()

  const householdId = household?.householdId
  const { data: mealPlans, isLoading, isError } = useMealPlans(householdId ?? 0)
  const { data: householdRecipes } = useHouseholdRecipes(
    household?.householdId ?? null,
  )

  const mealPlan = mealPlans?.find((mp) => mp.id === mealPlanId)

  const methods = useForm<CreateMealPlanFormValues>({
    resolver: zodResolver(createMealPlanSchema),
    defaultValues: {
      householdRecipes: [],
      recipeAmount: mealPlan?.mealPlanItems.length,
      name: mealPlan?.name ?? '',
      startDate: mealPlan?.startDate,
      endDate: mealPlan?.endDate,
      preference: 'balanced',
    },
  })

  if (!household) return <div>No active household</div>
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load meal plans</div>
  if (!mealPlan) return <div>Meal plan not found</div>

  const usedRecipeIds = mealPlan.mealPlanItems.map((item) => item.recipeId)
  const unusedRecipes = householdRecipes?.filter(
    (r) => !usedRecipeIds.includes(r.recipeId),
  )
  console.log(mealPlan)

  return (
    <div>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-3">
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
          <table className="w-full table-auto border-collapse mx-auto">
            <thead>
              <tr className="even:bg-muted m-0 border-t p-0">
                <th className="border px-2 py-2 text-center font-bold w-1/2">
                  {t('common:recipes')}
                </th>
                <th className="border px-2 py-2 text-center font-bold w-1/2">
                  {t('common:remove')}
                </th>
              </tr>
            </thead>
            {mealPlan.mealPlanItems.map((item) => (
              <tr key={item.id} className="even:bg-muted m-0 border-t p-0">
                <th className="border px-2 py-2 text-left w-3/4">
                  <Link
                    to={item.recipeId ? `/recipe/${item.recipeId}` : '#'}
                    className="flex flex-row hover:bg-muted/50 justify-between"
                  >
                    <div>{item.recipe?.name}</div>
                    <ArrowRight />
                  </Link>
                </th>
                <th className="border px-2 py-2">
                  <Checkbox />
                </th>
              </tr>
            ))}
          </table>

          {unusedRecipes && (
            <table className="w-full table-auto border-collapse mx-auto">
              <thead>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <th className="border px-2 py-2 text-center font-bold w-1/2">
                    {t('common:unused_recipes')}
                  </th>
                  <th className="border px-2 py-2 text-center font-bold w-1/2">
                    {t('common:add')}
                  </th>
                </tr>
              </thead>
              {unusedRecipes.map((r) => (
                <tr key={r.recipeId} className="even:bg-muted m-0 border-t p-0">
                  <th className="border px-2 py-2 text-left w-3/4">
                    <Link
                      to={r.recipeId ? `/recipe/${r.recipeId}` : '#'}
                      className="flex flex-row hover:bg-muted/50 justify-between"
                    >
                      <div>{r.recipe.name}</div>
                      <ArrowRight />
                    </Link>
                  </th>
                  <th className="border px-2 py-2">
                    <Checkbox />
                  </th>
                </tr>
              ))}
            </table>
          )}

          <FieldGroup>
            <Button type="submit">{t('common:edit')}</Button>
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  )
}

export default MealPlanDetailsView
