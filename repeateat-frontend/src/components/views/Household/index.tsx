import { useBoundStore } from '@/store'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HouseholdSelector from './HouseholdSelector'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useUserHouseholds } from '@/hooks/useHousehold'
import type { UserHousehold } from '@repeateat/shared'
import NewHouseholdForm from './NewHouseholdForm'
import { Separator } from '@/components/ui/separator'
import HouseholdSubNav from './HouseholdSubNav'

const HouseholdView = () => {
  const { setPageTitle, activeHouseholdId } = useBoundStore()
  const { t } = useTranslation()
  const { data, isLoading, error } = useUserHouseholds()

  useEffect(() => {
    setPageTitle('household')
  }, [t, setPageTitle])

  if (isLoading) return <div>Loading households</div>
  if (error || !data) return <div>Households not found</div>

  const userHouseholds: UserHousehold[] = data

  const effectiveHouseholdId =
    activeHouseholdId ?? userHouseholds[0]?.householdId ?? null

  const activeHousehold =
    userHouseholds.find((h) => h.householdId === effectiveHouseholdId) ?? null

  return (
    <Card className="w-full sm:max-w-md max-h-[85vh]">
      {userHouseholds.length > 0 && (
        <CardHeader>
          <HouseholdSelector userHouseholds={userHouseholds} />
          <div className="flex flex-col gap-2">
            <Separator />
            <HouseholdSubNav />
            <Separator />
          </div>
        </CardHeader>
      )}
      <div className="flex flex-col flex-1 overflow-y-auto p-1 gap-4">
        {userHouseholds.length > 0 && (
          <>
            <CardContent>
              <Outlet context={{ household: activeHousehold }} />
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
