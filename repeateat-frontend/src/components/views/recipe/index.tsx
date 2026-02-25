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
import { Link } from 'react-router-dom'
import AddToHouseholdButton from './AddToHouseholdButton'

const RecipeView = () => {
  const { setPageTitle } = useBoundStore()
  const { t } = useTranslation(['common'])
  const { data, isLoading, error } = useAllRecipes()
  const [searchTerm, setSearchterm] = useState<string>('')

  useEffect(() => {
    setPageTitle('recipes')
  }, [setPageTitle])

  if (isLoading) return <div>Loading recipes</div>
  if (error || !data) return <div>Recipes not found</div>

  const recipes: FullRecipe[] = data

  const searchRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <InputGroup>
            <InputGroupInput
              placeholder={t('common:search')}
              onChange={(e) => setSearchterm(e.target.value)}
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
            <Link
              key={r.id}
              to={`/recipe/${r.id}`}
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
                <AddToHouseholdButton recipeId={String(r.id)} source="list" />
                <ArrowRight />
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default RecipeView
