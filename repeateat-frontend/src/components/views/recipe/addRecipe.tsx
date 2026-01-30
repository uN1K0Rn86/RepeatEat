import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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

const AddRecipeForm = () => {
  const { user, setPageTitle } = useBoundStore()
  const { t } = useTranslation(['common', 'recipe'])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddRecipe>({
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <FieldLegend>{t('recipe:add_recipe')}</FieldLegend>
          <Field>
            <FieldLabel htmlFor="recipe-name">{t('common:name')}</FieldLabel>
            <Input
              {...register('name')}
              id="recipe-name"
              placeholder="eg. Pasta Carbonara"
              required
            />
            <FieldError>{errors.name?.message}</FieldError>
          </Field>
        </FieldGroup>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('recipe:creating') : t('recipe:add_recipe')}
        </Button>
      </form>
    </div>
  )
}

export default AddRecipeForm
