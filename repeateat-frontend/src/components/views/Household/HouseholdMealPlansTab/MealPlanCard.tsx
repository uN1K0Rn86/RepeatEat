import type { MealPlan } from '@repeateat/shared'

interface MealPlanCardProps {
  mealPlan: MealPlan
}

const MealPlanCard = ({ mealPlan }: MealPlanCardProps) => {
  console.log(mealPlan)
  return (
    <div className="p-3 border rounded-lg bg-card space-y-3">
      <div>{mealPlan.name}</div>
    </div>
  )
}

export default MealPlanCard
