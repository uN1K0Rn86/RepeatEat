import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useBoundStore } from '@/store'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { addRecipeSchema, type AddRecipe } from '@repeateat/shared/src'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import IngredientPicker from './IngredientPicker'
import StepAdder from './StepAdder'

const AddRecipeForm = () => {
  const { user, setPageTitle } = useBoundStore()
  const { t } = useTranslation(['common', 'recipe'])

  const methods = useForm<AddRecipe>({
    resolver: zodResolver(addRecipeSchema),
    defaultValues: {
      name: '',
      ingredients: [],
      steps: [],
    },
  })

  useEffect(() => {
    setPageTitle('recipes')
  }, [setPageTitle])

  const onSubmit = (data: AddRecipe) => {
    console.log('Adding recipe:', data)
  }

  if (!user) {
    return <div>{t('recipe:login_prompt')}</div>
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <FieldLegend>{t('recipe:add_recipe')}</FieldLegend>
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
        </FieldGroup>
        <IngredientPicker />
        <StepAdder />
        <Button type="submit" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting
            ? t('recipe:creating')
            : t('recipe:add_recipe')}
        </Button>
      </form>
    </FormProvider>
  )
}

export default AddRecipeForm
