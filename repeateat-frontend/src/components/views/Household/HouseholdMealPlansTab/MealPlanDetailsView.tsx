import {
  createMealPlanSchema,
  type CreateMealPlanFormValues,
  type UserHousehold,
} from '@repeateat/shared'
import { useOutletContext, useParams } from 'react-router-dom'
import { useMealPlans } from '@/hooks/useMealPlan'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MealPlanForm from './MealPlanForm'

const MealPlanDetailsView = () => {
  const { id } = useParams<{ id: string }>()
  const mealPlanId = Number(id)
  const { household } = useOutletContext<{ household: UserHousehold | null }>()

  const householdId = household?.householdId
  const { data: mealPlans, isLoading, isError } = useMealPlans(householdId ?? 0)

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

  return (
    <div>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-3">
          <MealPlanForm mode="edit" mealPlan={mealPlan} />
        </form>
      </FormProvider>
    </div>
  )
}

export default MealPlanDetailsView
