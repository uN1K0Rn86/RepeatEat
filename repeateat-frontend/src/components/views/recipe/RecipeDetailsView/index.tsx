import { useNavigate, useParams } from 'react-router-dom'
import { useRecipe } from '@/hooks/useRecipe'
import { useEffect, useState } from 'react'
import { useBoundStore } from '@/store'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ViewPicker from './ViewPicker'
import IngredientsView from './IngredientsView'
import StepsView from './StepsView'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import {
  updateRecipeSchema,
  type FullRecipe,
  type UpdateRecipe,
} from '@repeateat/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { notify } from '@/utils/notify'
import { useEditRecipe } from '@/hooks/useEditRecipe'
import recipeService from '@/services/recipes'
import { useMe } from '@/hooks/useUser'

const RecipeDetailsView = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useRecipe(id || '')
  const { setPageTitle } = useBoundStore()
  const { t } = useTranslation(['common', 'notify', 'recipe'])
  const { data: user } = useMe()
  const editRecipeMutation = useEditRecipe()
  const navigate = useNavigate()

  const [activeView, setActiveView] = useState<'ingredients' | 'preparation'>(
    'ingredients',
  )
  const [isEditable, setIsEditable] = useState<boolean>(false)

  const methods = useForm<UpdateRecipe>({
    resolver: zodResolver(updateRecipeSchema),
    values: data,
  })

  useEffect(() => {
    setPageTitle('recipes')
  }, [setPageTitle])

  if (isLoading) return <div>Loading recipe</div>
  if (error || !data) return <div>Recipe not found</div>

  const recipe: FullRecipe = data

  const onSave = async (formData: UpdateRecipe) => {
    if (!user || (user && user.id !== recipe.authorId)) {
      notify.error('Not authorized to edit recipe')
    }

    try {
      const updatedRecipe = await editRecipeMutation.mutateAsync(formData)
      setIsEditable(false)
      notify.success(
        t('notify:update_recipe', { recipeName: updatedRecipe.name }),
      )
    } catch {
      notify.error(t('notify:update_recipe_failed'))
    }
  }

  const onDelete = async (id: number) => {
    if (!window.confirm(t('recipe:confirm_del'))) return

    try {
      await recipeService.deleteRecipe(id)
      notify.success(t('notify:recipe_deleted'))
      void navigate('/recipe')
    } catch (err) {
      notify.error(t('notify:recipe_del_failed'))
      console.error(err)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSave)}
        className="flex min-h-screen flex-col items-center"
      >
        <Card className="w-full sm:max-w-md">
          <CardHeader className="flex flex-row justify-between">
            {isEditable ? (
              <CardTitle>
                <Input
                  {...methods.register('name')}
                  className="text-xs sm:text-sm h-8"
                  placeholder={recipe.name}
                />
              </CardTitle>
            ) : (
              <CardTitle>{recipe.name}</CardTitle>
            )}

            {user && user.id === recipe.authorId && (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onDelete(recipe.id)}
                >
                  {t('common:delete')}
                </Button>
                <Button
                  onClick={() => setIsEditable(!isEditable)}
                  type="button"
                >
                  {t('common:edit')}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <ViewPicker activeView={activeView} onViewChange={setActiveView} />
            <div className="mt-4">
              {activeView === 'ingredients' ? (
                <IngredientsView editable={isEditable} />
              ) : (
                <StepsView editable={isEditable} />
              )}
            </div>
          </CardContent>
          {isEditable && (
            <CardFooter>
              <Button type="submit">{t('common:save')}</Button>
            </CardFooter>
          )}
        </Card>
      </form>
    </FormProvider>
  )
}

export default RecipeDetailsView
