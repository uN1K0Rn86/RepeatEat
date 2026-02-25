import { useBoundStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import HouseholdSelector from './HouseholdSelector'
import HouseholdInfo from './HouseholdInfo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useUserHouseholds } from '@/hooks/useHousehold'
import type { UserHousehold } from '@repeateat/shared'
import NewHouseholdForm from './NewHouseholdForm'

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

  return userHouseholds.length > 0 ? (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <HouseholdSelector userHouseholds={userHouseholds} />
      </CardHeader>
      <CardContent>
        {activeHousehold && <HouseholdInfo household={activeHousehold} />}
      </CardContent>
    </Card>
  ) : (
    <NewHouseholdForm />
  )
}

export default HouseholdView
