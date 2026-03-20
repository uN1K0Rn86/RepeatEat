import { useEffect, useState } from 'react'

import { useBoundStore } from '@/store'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search } from 'lucide-react'
import { useAllRecipes } from '@/hooks/useRecipe'
import type { FullRecipe } from '@repeateat/shared'
import { useNavigate } from 'react-router-dom'
import AddToHouseholdButton from './AddToHouseholdButton'
import { useHouseholdRecipes } from '@/hooks/useHousehold'
import { useMe } from '@/hooks/useUser'
import MarkAsCookedButton from './MarkAsCookedButton'

const RecipeView = () => {
  const { setPageTitle } = useBoundStore()
  const { t } = useTranslation(['common'])
  const { data, isLoading, error } = useAllRecipes()
  const [searchTerm, setSearchterm] = useState<string>('')
  const navigate = useNavigate()
  const { activeHouseholdId } = useBoundStore()
  const { data: user } = useMe()
  const { data: householdRecipes } = useHouseholdRecipes(
    activeHouseholdId ?? user?.defaultHouseholdId ?? null,
  )

  useEffect(() => {
    setPageTitle('recipes')
  }, [setPageTitle])

  if (isLoading) return <div>Loading recipes</div>
  if (error || !data) return <div>Recipes not found</div>

  const recipes: FullRecipe[] = data

  const searchRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const householdRecipeIds = householdRecipes?.map((hr) => hr.recipeId)

  return (
    <Card className="w-full sm:max-w-md overflow-y-auto">
      <CardHeader>
        <InputGroup>
          <InputGroupInput
            placeholder={t('common:search')}
            onChange={(e) => setSearchterm(e.target.value)}
            data-testid="recipe-search"
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {searchRecipes.length} results
          </InputGroupAddon>
        </InputGroup>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {searchRecipes.map((r) => (
          <div
            key={r.id}
            onClick={() => navigate(`/recipe/${r.id}`)}
            className="flex items-center justify-between border rounded-md p-2 hover:bg-muted/50 hover:border-accent-foreground/20"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                {r.name}
              </span>

              <span className="text-xs text-muted-foreground">
                {t('recipe:view_details')}
              </span>
            </div>

            <div className="flex flex-row gap-2 text-muted-foreground group-hover:translate-x-1 transition-transform items-center">
              {user &&
                (householdRecipeIds && householdRecipeIds.includes(r.id) ? (
                  <MarkAsCookedButton recipeId={String(r.id)} source="list" />
                ) : (
                  <AddToHouseholdButton recipeId={String(r.id)} source="list" />
                ))}
              <ArrowRight />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default RecipeView
