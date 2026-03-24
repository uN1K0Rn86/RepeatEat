import { useOutletContext } from 'react-router-dom'

import { type UserHousehold } from '@repeateat/shared'
import { useHouseholdRecipes } from '@/hooks/useHousehold'
import NewMealPlanForm from './NewMealPlanForm'
import { Accordion } from '@/components/ui/accordion'
import { Home } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const HouseholdMealPlansTab = () => {
  const { household } = useOutletContext<{ household: UserHousehold }>()
  const { data: householdRecipes, isLoading } = useHouseholdRecipes(
    household.householdId,
  )

  if (isLoading) return <div>Loading...</div>

  console.log(household)
  console.log(householdRecipes)

  return (
    <div>
      <Accordion className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 font-bold">
          <Home />
          {household.name}
        </div>
        <Separator />
        <NewMealPlanForm />
      </Accordion>
    </div>
  )
}

export default HouseholdMealPlansTab
