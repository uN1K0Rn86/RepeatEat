import { Input } from '@/components/ui/input'
import { type UpdateRecipe } from '@repeateat/shared'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface IngredientProps {
  editable: boolean
}

const IngredientsView = ({ editable }: IngredientProps) => {
  const { t } = useTranslation(['recipe', 'common'])
  const { register, control } = useFormContext<UpdateRecipe>()

  const { fields } = useFieldArray({
    control,
    name: 'ingredients',
  })

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse mx-auto text-xs sm:text-sm md:text-base">
        <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            <th className="border px-4 py-2 text-left font-bold w-1/2">
              {t('common:name')}
            </th>
            <th className="border px-4 py-2 text-left font-bold">
              {t('recipe:quantity')}
            </th>
            <th className="border px-4 py-2 text-left font-bold">
              {t('recipe:unit')}
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id} className="even:bg-muted m-0 border-t p-0">
              <th className="border px-4 py-2 text-left w-1/2">
                {editable ? (
                  <Input
                    {...register(`ingredients.${index}.ingredient.name`)}
                    className="text-xs sm:text-sm h-8"
                  />
                ) : (
                  field.ingredient.name
                )}
              </th>
              <th className="border px-4 py-2 w-1/4">
                {editable ? (
                  <Input
                    {...register(`ingredients.${index}.quantity`)}
                    className="text-xs sm:text-sm h-8"
                  />
                ) : (
                  field.quantity
                )}
              </th>
              <th className="border px-2 py-2 w-1/4">
                {editable ? (
                  <Input
                    {...register(`ingredients.${index}.unit`)}
                    className="text-xs sm:text-sm h-8"
                  />
                ) : (
                  field.unit
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IngredientsView
