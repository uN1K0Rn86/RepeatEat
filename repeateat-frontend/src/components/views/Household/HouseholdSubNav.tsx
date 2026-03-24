import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const tabBase =
  'flex-1 rounded-md px-4 py-2 text-sm font-medium text-center transition-colors'
const tabInactive =
  'text-muted-foreground hover:text-foreground hover:bg-background/80'
const tabActive = 'bg-accent text-background shadow-sm'

const HouseholdSubNav = () => {
  const { t } = useTranslation(['household'])

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="grid grid-cols-2 gap-1 rounded-xl border bg-muted p-1">
        <NavLink
          to="/household"
          end
          className={({ isActive }) =>
            cn(tabBase, isActive ? tabActive : tabInactive)
          }
        >
          {t('household:overview')}
        </NavLink>
        <NavLink
          to="/household/meal-plans"
          className={({ isActive }) =>
            cn(tabBase, isActive ? tabActive : tabInactive)
          }
        >
          {t('household:meal_plans')}
        </NavLink>
      </div>
    </div>
  )
}

export default HouseholdSubNav
