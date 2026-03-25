import { useUserInfo } from '@/hooks/useUser'
import type { MealPlan } from '@repeateat/shared'
import { useTranslation } from 'react-i18next'

interface MealPlanCardProps {
  mealPlan: MealPlan
}

const MealPlanCard = ({ mealPlan }: MealPlanCardProps) => {
  const { t } = useTranslation(['common'])
  const {
    data: createdByUser,
    isLoading,
    isError,
  } = useUserInfo(mealPlan.createdBy)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  if (!createdByUser) return <div>Cannot find user</div>

  console.log(mealPlan)
  return (
    <div className="p-3 border rounded-lg bg-muted space-y-3">
      <div className="flex flex-row justify-between">
        <div className="font-bold underline underline-offset-2">
          {mealPlan.name}
        </div>
        <div>
          {t('common:created_by')}: {createdByUser.name}
        </div>
      </div>
      <div>moi</div>
      <div>m</div>
    </div>
  )
}

export default MealPlanCard
