import { useEffect, useState } from 'react'

import { useBoundStore } from '@/store'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { useAllRecipes } from '@/hooks/useRecipe'
import type { FullRecipe } from '@repeateat/shared'
import { Link } from 'react-router-dom'

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
            <div key={r.id} className="border rounded-sm p-2">
              <Link to={`/recipe/${r.id}`} className="font-bold">
                {r.name}
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default RecipeView
