import { Accordion } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import type { UserHousehold } from '@repeateat/shared'
import { Home } from 'lucide-react'
import HouseholdRecipeList from './HouseholdRecipeList'
import HouseholdMemberList from './HouseholdMemberList'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useSetDefaultHousehold } from '@/hooks/useUser'

export interface InfoProps {
  household: UserHousehold
}

const HouseholdInfo = ({ household }: InfoProps) => {
  const { t } = useTranslation()
  const defaultHouseholdMutation = useSetDefaultHousehold()

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
        <Button
          type="button"
          onClick={() => defaultHouseholdMutation.mutate(household.householdId)}
        >
          {t('household:set_as_default')}
        </Button>
      </Accordion>
    </div>
  )
}

export default HouseholdInfo
