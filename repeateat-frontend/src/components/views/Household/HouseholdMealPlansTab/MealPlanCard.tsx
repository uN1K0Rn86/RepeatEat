import { Button } from '@/components/ui/button'
import { useUserInfo } from '@/hooks/useUser'
import type { MealPlan } from '@repeateat/shared'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

interface MealPlanCardProps {
  mealPlan: MealPlan
}

const MealPlanCard = ({ mealPlan }: MealPlanCardProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'recipe'])
  const {
    data: createdByUser,
    isLoading,
    isError,
  } = useUserInfo(mealPlan.createdBy)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  if (!createdByUser) return <div>Cannot find user</div>

  const startDate = new Date(mealPlan.startDate)
  const endDate = new Date(mealPlan.endDate)

  const startText = Number.isNaN(startDate.getTime())
    ? '-'
    : startDate.toLocaleDateString()
  const endText = Number.isNaN(endDate.getTime())
    ? '-'
    : endDate.toLocaleDateString()

  return (
    <div className="flex flex-col p-3 border rounded-lg bg-muted space-y-3">
      <div className="flex flex-row justify-between">
        <div className="font-bold underline underline-offset-2">
          {mealPlan.name}
        </div>
        <div>
          {t('common:created_by')}: {createdByUser.name}
        </div>
      </div>
      <div>
        {t('common:valid')}: {startText} - {endText}
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">{t('common:recipes')}</div>

        <div className="flex flex-wrap justify-between gap-2">
          {mealPlan.mealPlanItems.map((item) => (
            <Link
              key={item.id}
              to={item.recipeId ? `/recipe/${item.recipeId}` : '#'}
              className="rounded-full bg-foreground border px-1 py-1.5 text-sm text-background hover:bg-accent transition-colors"
            >
              {item.recipe?.name ?? item.title ?? t('common:unknown')}
            </Link>
          ))}
        </div>
      </div>
      <Button
        variant="accent"
        onClick={() => void navigate(`/household/meal-plans/${mealPlan.id}`)}
        className="flex-1"
      >
        {t('recipe:view_details')} / {t('common:edit')}
      </Button>
    </div>
  )
}

export default MealPlanCard
