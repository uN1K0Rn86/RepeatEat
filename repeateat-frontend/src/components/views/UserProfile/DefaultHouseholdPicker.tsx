import { Button } from '@/components/ui/button'
import { useUserHouseholds } from '@/hooks/useHousehold'
import { useSetDefaultHousehold } from '@/hooks/useUser'
import { useBoundStore } from '@/store'
import { useTranslation } from 'react-i18next'

const DefaultHouseholdPicker = () => {
  const { data: userHouseholds } = useUserHouseholds()
  const { activeHouseholdId, setActiveHouseholdId } = useBoundStore()
  const { t } = useTranslation(['household'])
  const defaultHouseholdMutation = useSetDefaultHousehold()

  const handleClick = (householdId: number) => {
    const previousActiveHouseholdId = activeHouseholdId
    setActiveHouseholdId(householdId)
    defaultHouseholdMutation.mutate(householdId, {
      onError: () => {
        setActiveHouseholdId(previousActiveHouseholdId)
      },
    })
  }

  return (
    <div className="flex flex-col gap-2 font-bold">
      {t('household:set_default_household')}
      <div className="flex flex-row gap-2 font-normal">
        {userHouseholds?.map((h) => (
          <Button
            type="button"
            key={h.householdId}
            variant={
              activeHouseholdId === h.householdId ? 'default' : 'secondary'
            }
            onClick={() => handleClick(h.householdId)}
          >
            {h.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default DefaultHouseholdPicker
