import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useMealPlans } from '@/hooks/useMealPlan'
import type { UserHousehold } from '@repeateat/shared'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import MealPlanCard from './MealPlanCard'

const HouseholdMealPlans = () => {
  const { t } = useTranslation(['household'])
  const { household } = useOutletContext<{ household: UserHousehold }>()
  const {
    data: mealPlans,
    isLoading,
    isError,
  } = useMealPlans(household.householdId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

  return (
    <AccordionItem value="household-mealplans">
      <AccordionTrigger className="font-bold">
        {t('household:meal_plans')}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2">
        {mealPlans?.map((mp) => (
          <MealPlanCard key={mp.id} mealPlan={mp} />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

export default HouseholdMealPlans
