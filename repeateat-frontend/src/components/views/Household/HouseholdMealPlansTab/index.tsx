import { useOutletContext } from 'react-router-dom'

import { type UserHousehold } from '@repeateat/shared'
import NewMealPlanForm from './NewMealPlanForm'
import { Accordion } from '@/components/ui/accordion'
import { Home } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import HouseholdMealPlans from './HouseholdMealPlans'

const HouseholdMealPlansTab = () => {
  const { household } = useOutletContext<{ household: UserHousehold }>()

  return (
    <div>
      <Accordion className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 font-bold">
          <Home />
          {household.name}
        </div>
        <Separator />
        <NewMealPlanForm />
        <HouseholdMealPlans />
      </Accordion>
    </div>
  )
}

export default HouseholdMealPlansTab
