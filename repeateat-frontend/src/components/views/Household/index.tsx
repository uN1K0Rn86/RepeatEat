import { useBoundStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import HouseholdSelector from './HouseholdSelector'
import HouseholdInfo from './HouseholdInfo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useUserHouseholds } from '@/hooks/useHousehold'
import type { UserHousehold } from '@repeateat/shared'
import NewHouseholdForm from './NewHouseholdForm'
import { Separator } from '@/components/ui/separator'

const HouseholdView = () => {
  const { setPageTitle, activeHouseholdId } = useBoundStore()
  const { t } = useTranslation()
  const { data, isLoading, error } = useUserHouseholds()

  useEffect(() => {
    setPageTitle('home')
  }, [t, setPageTitle])

  if (isLoading) return <div>Loading households</div>
  if (error || !data) return <div>Households not found</div>

  const userHouseholds: UserHousehold[] = data

  const activeHousehold = userHouseholds.find(
    (h) => h.householdId === activeHouseholdId,
  )

  return (
    <Card className="w-full sm:max-w-md max-h-[85vh]">
      {userHouseholds.length > 0 && (
        <CardHeader>
          <HouseholdSelector userHouseholds={userHouseholds} />
        </CardHeader>
      )}
      <div className="flex flex-col flex-1 overflow-y-auto p-1 gap-4">
        {userHouseholds.length > 0 && (
          <>
            <CardContent>
              {activeHousehold && <HouseholdInfo household={activeHousehold} />}
            </CardContent>
            <Separator />
          </>
        )}
        <NewHouseholdForm />
      </div>
    </Card>
  )
}

export default HouseholdView
