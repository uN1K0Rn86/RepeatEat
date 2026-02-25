import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import MemberDropdown from './MemberDropdown'
import type { HouseholdMember, UserHousehold } from '@repeateat/shared'
import { Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import AddMemberForm from './AddMemberForm'
import { useMe } from '@/hooks/useUser'
import { useHouseholdRecipes } from '@/hooks/useHousehold'

export interface InfoProps {
  household: UserHousehold
}

const HouseholdInfo = ({ household }: InfoProps) => {
  const { t } = useTranslation(['household', 'common', 'recipe'])
  const { data: user } = useMe()
  const {
    data: householdRecipes,
    isLoading,
    error,
  } = useHouseholdRecipes(household.householdId)

  if (isLoading) return <div>Loading recipes</div>
  if (error) return <div>Couldn't load recipes</div>
  console.log(householdRecipes)

  return (
    <div>
      <Accordion className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 font-bold">
          <Home />
          {household.name}
        </div>
        <Separator />
        <AccordionItem value="members">
          <AccordionTrigger className="font-bold">
            {t('household:members')}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            {user &&
              household.members.map((m: HouseholdMember) => {
                const self = user.id === m.id
                return (
                  <div key={m.id} className="flex flex-row justify-between">
                    <div className="flex items-center gap-2">
                      <span>{m.name}</span>
                      {m.role === 'admin' && (
                        <Badge>{t('household:admin')}</Badge>
                      )}
                    </div>
                    {household.role === 'admin' && (
                      <MemberDropdown self={self} member={m} />
                    )}
                  </div>
                )
              })}
            {household.role === 'admin' && (
              <AddMemberForm household={household} />
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recipes">
          <AccordionTrigger className="font-bold">
            {t('common:recipes')}
          </AccordionTrigger>
          <AccordionContent>
            {householdRecipes?.map((r) => (
              <Link
                key={r.recipeId}
                to={`/recipe/${r.recipeId}`}
                className="flex items-center justify-between border rounded-md p-2 hover:bg-muted/50 hover:border-accent-foreground/20"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                    {r.recipe.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {t('recipe:view_details')}
                  </span>
                </div>

                <div className="flex flex-row gap-2 text-muted-foreground group-hover:translate-x-1 transition-transform items-center">
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default HouseholdInfo
