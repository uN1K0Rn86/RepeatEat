import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

import { type UserHousehold } from '@repeateat/shared'
import { useBoundStore } from '@/store'

interface SelectorProps {
  userHouseholds: UserHousehold[]
}

const HouseholdSelector = ({ userHouseholds }: SelectorProps) => {
  const { activeHouseholdId, setActiveHouseholdId } = useBoundStore()
  const { t } = useTranslation(['household'])

  return (
    <div className="flex flex-col items-center gap-2">
      <CardTitle>{t('household:select_household')}</CardTitle>
      <div className="flex gap-2">
        {userHouseholds.map((h) => (
          <div key={h.householdId}>
            <Button
              type="button"
              variant={
                activeHouseholdId === h.householdId ? 'default' : 'outline'
              }
              onClick={() => setActiveHouseholdId(h.householdId)}
            >
              {h.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HouseholdSelector
