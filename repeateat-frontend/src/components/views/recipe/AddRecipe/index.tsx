import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useBoundStore } from '@/store'
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { addRecipeSchema, type AddRecipe } from '@repeateat/shared/src'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import IngredientPicker from './IngredientPicker'
import StepAdder from './StepAdder'
import CategoryPicker from './CategoryPicker'
import { useCreateRecipe } from '@/hooks/useCreateRecipe'
import { useNavigate } from 'react-router-dom'
import { notify } from '@/utils/notify'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

const AddRecipeForm = () => {
  const { user, setPageTitle } = useBoundStore()
  const { t } = useTranslation(['common', 'recipe'])
  const createRecipeMutation = useCreateRecipe()
  const navigate = useNavigate()

  const methods = useForm<AddRecipe>({
    resolver: zodResolver(addRecipeSchema),
    defaultValues: {
      name: '',
      ingredients: [],
      steps: [],
      categories: [],
      private: false,
    },
  })

  useEffect(() => {
    setPageTitle('recipes')
  }, [setPageTitle])

  const onSubmit = async (data: AddRecipe) => {
    try {
      const newRecipe = await createRecipeMutation.mutateAsync(data)
      void navigate(`/recipe/${newRecipe.id}`)
      notify.success(`Recipe ${newRecipe.name} added`)
    } catch (error) {
      console.error('Submission failed: ', error)
    }
  }

  if (!user) {
    return <div>{t('recipe:login_prompt')}</div>
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex min-h-screen flex-col items-center"
      >
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <FieldLegend>{t('recipe:add_recipe')}</FieldLegend>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="recipe-name">{t('common:name')}</FieldLabel>
              <Input
                {...methods.register('name')}
                id="recipe-name"
                placeholder="eg. Pasta Carbonara"
                required
              />
              <FieldError>{methods.formState.errors.name?.message}</FieldError>
            </Field>
            <div className="flex flex-row gap-2">
              <div className="flex items-center">
                <Controller
                  control={methods.control}
                  name="private"
                  render={({ field }) => (
                    <Checkbox
                      id="recipe-private"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="space-y-1 leading-none">
                <FieldLabel
                  htmlFor="recipe-private"
                  className="text-sm font-medium"
                >
                  {t('recipe:private_recipe')}
                </FieldLabel>
              </div>
            </div>

            <IngredientPicker />
            <StepAdder />
            <CategoryPicker />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={methods.formState.isSubmitting}>
              {methods.formState.isSubmitting
                ? t('recipe:creating')
                : t('recipe:add_recipe')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}

export default AddRecipeForm
