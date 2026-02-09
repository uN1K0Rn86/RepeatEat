import { useParams } from 'react-router-dom'
import { useRecipe } from '@/hooks/useRecipe'
import { useEffect, useState } from 'react'
import { useBoundStore } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ViewPicker from './ViewPicker'
import IngredientsView from './IngredientsView'
import StepsView from './StepsView'

const RecipeDetailsView = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useRecipe(id || '')
  const { setPageTitle } = useBoundStore()
  const [activeView, setActiveView] = useState<'ingredients' | 'preparation'>(
    'ingredients',
  )

  useEffect(() => {
    setPageTitle('recipes')
  }, [setPageTitle])

  if (isLoading) return <div>Loading recipe</div>
  if (error || !data) return <div>Recipe not found</div>

  const recipe = data

  console.log(recipe)

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>{recipe.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ViewPicker activeView={activeView} onViewChange={setActiveView} />
          <div className="mt-4">
            {activeView === 'ingredients' ? (
              <IngredientsView ingredients={recipe.ingredients} />
            ) : (
              <StepsView steps={recipe.steps} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RecipeDetailsView
