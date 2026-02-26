import { Accordion } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import type { UserHousehold } from '@repeateat/shared'
import { Home } from 'lucide-react'
import HouseholdRecipeList from './HouseholdRecipeList'
import HouseholdMemberList from './HouseholdMemberList'

export interface InfoProps {
  household: UserHousehold
}

const HouseholdInfo = ({ household }: InfoProps) => {
  return (
    <div>
      <Accordion className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 font-bold">
          <Home />
          {household.name}
        </div>
        <Separator />
        <HouseholdMemberList household={household} />
        <HouseholdRecipeList householdId={household.householdId} />
      </Accordion>
    </div>
  )
}

export default HouseholdInfo
