import { useHouseholdRecipes } from '@/hooks/useHousehold'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface HouseholdRecipeListProps {
  householdId: number
}

const HouseholdRecipeList = ({ householdId }: HouseholdRecipeListProps) => {
  const {
    data: householdRecipes,
    isLoading,
    error,
  } = useHouseholdRecipes(householdId)
  const { t } = useTranslation(['recipe', 'common'])

  if (isLoading) return <div>Loading recipes</div>
  if (error) return <div>Couldn't load recipes</div>

  return (
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
  )
}

export default HouseholdRecipeList
