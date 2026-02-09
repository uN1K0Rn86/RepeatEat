import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import { type UpdateRecipe } from '@repeateat/shared'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface IngredientProps {
  editable: boolean
}

const IngredientsView = ({ editable }: IngredientProps) => {
  const { t } = useTranslation(['recipe', 'common'])
  const { register, control } = useFormContext<UpdateRecipe>()

  const { fields, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse mx-auto text-xs sm:text-sm md:text-base">
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
            {editable && (
              <th className="border px-4 py-2 text-left font-bold"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id} className="even:bg-muted m-0 border-t p-0">
              <td className="border px-4 py-2 text-left w-1/2">
                {editable ? (
                  <Input
                    {...register(`ingredients.${index}.ingredient.name`)}
                    className="text-xs sm:text-sm h-8"
                  />
                ) : (
                  field.ingredient.name
                )}
              </td>
              <td className="border px-2 py-2 w-1/6">
                {editable ? (
                  <Input
                    {...register(`ingredients.${index}.quantity`)}
                    className="text-xs sm:text-sm h-8"
                  />
                ) : (
                  field.quantity
                )}
              </td>
              <td className="border px-2 py-2 w-1/6">
                {editable ? (
                  <Input
                    {...register(`ingredients.${index}.unit`)}
                    className="text-xs sm:text-sm h-8"
                  />
                ) : (
                  field.unit
                )}
              </td>
              {editable && (
                <td className="border w-10 text-center">
                  <Button
                    className="w-6 h-6"
                    type="button"
                    variant="outline"
                    onClick={() =>
                      window.confirm(t('common:confirm_delete')) &&
                      remove(index)
                    }
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IngredientsView
