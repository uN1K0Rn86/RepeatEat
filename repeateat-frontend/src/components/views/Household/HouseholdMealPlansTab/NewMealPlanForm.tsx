import { useOutletContext } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type UserHousehold,
  type CreateMealPlanFormValues,
  type CreateMealPlanPayload,
  createMealPlanSchema,
} from '@repeateat/shared'
import { FormProvider, useForm } from 'react-hook-form'

import { useHouseholdRecipes } from '@/hooks/useHousehold'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useTranslation } from 'react-i18next'
import { useCreateMealPlan } from '@/hooks/useMealPlan'
import MealPlanForm from './MealPlanForm'

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
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <MealPlanForm mode="create" mealPlan={null} />
          </form>
        </FormProvider>
      </AccordionContent>
    </AccordionItem>
  )
}

export default NewMealPlanForm
