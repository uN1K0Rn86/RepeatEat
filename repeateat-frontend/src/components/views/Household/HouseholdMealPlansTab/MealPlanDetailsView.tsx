import type { UserHousehold } from '@repeateat/shared'
import { useOutletContext, useParams } from 'react-router-dom'
import { useMealPlans } from '@/hooks/useMealPlan'

const MealPlanDetailsView = () => {
  const { id } = useParams<{ id: string }>()
  const mealPlanId = Number(id)
  const { household } = useOutletContext<{ household: UserHousehold | null }>()

  const householdId = household?.householdId
  const { data: mealPlans, isLoading, isError } = useMealPlans(householdId ?? 0)

  const mealPlan = mealPlans?.find((mp) => mp.id === mealPlanId) ?? null

  if (!household) return <div>No active household</div>
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load meal plans</div>
  if (!mealPlan) return <div>Meal plan not found</div>

  return (
    <div>
      <div>{mealPlan.name}</div>
    </div>
  )
}

export default MealPlanDetailsView
