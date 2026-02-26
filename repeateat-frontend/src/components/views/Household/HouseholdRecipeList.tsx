import { useHouseholdRecipes } from '@/hooks/useHousehold'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import CookLogForm from './CookLogForm'
import { format } from 'date-fns'

interface HouseholdRecipeListProps {
  householdId: number
}

const HouseholdRecipeList = ({ householdId }: HouseholdRecipeListProps) => {
  const {
    data: householdRecipes,
    isLoading,
    error,
  } = useHouseholdRecipes(householdId)
  const { t } = useTranslation(['recipe', 'common', 'household'])
  const navigate = useNavigate()

  if (isLoading) return <div>Loading recipes</div>
  if (error) return <div>Couldn't load recipes</div>

  return (
    <AccordionItem value="recipes">
      <AccordionTrigger className="font-bold">
        {t('common:recipes')}
      </AccordionTrigger>
      <AccordionContent>
        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {householdRecipes?.map((r) => (
            <div key={r.recipeId}>
              <AccordionItem
                value={r.recipe.name}
                className="border rounded-md p-2 hover:bg-muted/50 hover:border-accent-foreground/20"
              >
                <AccordionTrigger>{r.recipe.name}</AccordionTrigger>
                <AccordionContent className="flex flex-col p-2 gap-2 justify-between">
                  <div className="flex flex-row p-2 gap-2 justify-between items-center">
                    <div>
                      {t('household:last_cooked')}:{' '}
                      {r.recipe.cookingHistory.length > 0
                        ? format(
                            r.recipe.cookingHistory[0].cookedAt!,
                            'yyyy-MM-dd',
                          )
                        : t('common:never')}
                    </div>
                    <Button
                      onClick={() => void navigate(`/recipe/${r.recipeId}`)}
                    >
                      {t('recipe:view_details')}
                      <ArrowRight />
                    </Button>
                  </div>
                  <CookLogForm recipe={r} />
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  )
}

export default HouseholdRecipeList
