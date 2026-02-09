import { useParams } from 'react-router-dom'
import { useRecipe } from '@/hooks/useRecipe'
import { useEffect } from 'react'
import { useBoundStore } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const RecipeDetailsView = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useRecipe(id || '')
  const { setPageTitle } = useBoundStore()

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
        <CardContent></CardContent>
      </Card>
    </div>
  )
}

export default RecipeDetailsView
