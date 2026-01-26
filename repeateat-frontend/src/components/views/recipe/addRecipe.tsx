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
import { addRecipeSchema, type AddRecipe } from '@/types/recipe'
import { Button } from '@/components/ui/button'

const AddRecipeForm = () => {
  const { user } = useBoundStore()

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

  const onSubmit = (data: AddRecipe) => {
    console.log('Adding recipe:', data)
  }

  if (!user) {
    return <div>Please login to add a recipe</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <FieldLegend>Add Recipe</FieldLegend>
          <Field>
            <FieldLabel htmlFor="recipe-name">Name:</FieldLabel>
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
          {isSubmitting ? 'Creating...' : 'Add Recipe'}
        </Button>
      </form>
    </div>
  )
}

export default AddRecipeForm
