import { useEffect } from 'react'

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

const RecipeView = () => {
  const { setPageTitle } = useBoundStore()
  const { t } = useTranslation(['common'])
  const { data, isLoading, error } = useAllRecipes()

  useEffect(() => {
    setPageTitle('recipes')
  }, [setPageTitle])

  const resultsCount = 15

  if (isLoading) return <div>Loading recipes</div>
  if (error || !data) return <div>Recipes not found</div>

  const recipes: FullRecipe[] = data
  console.log(recipes)

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <InputGroup>
            <InputGroupInput placeholder={t('common:search')} />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {resultsCount} results
            </InputGroupAddon>
          </InputGroup>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  )
}

export default RecipeView
