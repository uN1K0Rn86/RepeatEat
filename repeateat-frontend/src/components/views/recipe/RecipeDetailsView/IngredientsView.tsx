import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { type UpdateRecipe } from '@repeateat/shared'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface IngredientProps {
  editable: boolean
}

const IngredientsView = ({ editable }: IngredientProps) => {
  const { t } = useTranslation(['recipe', 'common'])
  const { register, control, getValues } = useFormContext<UpdateRecipe>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  return (
    <div className="flex flex-col w-full overflow-x-auto gap-2">
      {/* Mobile View */}
      <div className="flex flex-col gap-3 sm:hidden">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-3 border rounded-lg bg-card space-y-3"
          >
            {editable && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-8 w-8 text-destructive"
                onClick={() =>
                  window.confirm(t('common:confirm_delete')) && remove(index)
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold text-muted-foreground">
                {t('common:name')}
              </label>
              {editable ? (
                <Input
                  {...register(`ingredients.${index}.ingredient.name`)}
                  className="h-9"
                />
              ) : (
                <p className="font-medium">{field.ingredient.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold text-muted-foreground">
                  {t('recipe:quantity')}
                </label>
                {editable ? (
                  <Input
                    type="number"
                    {...register(`ingredients.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    className="h-9"
                  />
                ) : (
                  <p>{field.quantity}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold text-muted-foreground">
                  {t('recipe:unit')}
                </label>
                {editable ? (
                  <Input
                    {...register(`ingredients.${index}.unit`)}
                    className="h-9"
                  />
                ) : (
                  <p>{field.unit}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <table className="w-full table-auto border-collapse mx-auto text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="even:bg-muted m-0 border-t p-0">
              <th className="border px-2 py-2 text-left font-bold w-1/2">
                {t('common:name')}
              </th>
              <th className="border px-2 py-2 text-left font-bold">
                {t('recipe:quantity')}
              </th>
              <th className="border px-2 py-2 text-left font-bold">
                {t('recipe:unit')}
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className="even:bg-muted m-0 border-t p-0">
                <td className="border px-2 py-2 text-left w-1/2">
                  {editable ? (
                    <Input
                      {...register(`ingredients.${index}.ingredient.name`)}
                      className="text-xs sm:text-sm h-8"
                    />
                  ) : (
                    field.ingredient.name
                  )}
                </td>
                <td className="border px-2 py-2">
                  {editable ? (
                    <Input
                      {...register(`ingredients.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      className="text-xs sm:text-sm h-8"
                    />
                  ) : (
                    field.quantity
                  )}
                </td>
                <td className="border px-2 py-2">
                  {editable ? (
                    <div className="flex flex-row">
                      <Input
                        {...register(`ingredients.${index}.unit`)}
                        className="text-xs sm:text-sm h-8"
                      />
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
                    </div>
                  ) : (
                    field.unit
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editable && (
        <Button
          className="w-full"
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              ingredient: { name: '' },
              quantity: 0,
              unit: '',
              recipeId: getValues('id'),
            })
          }
        >
          <Plus className="w-4 h-4 mr-1" />
          {t('common:add')}
        </Button>
      )}
    </div>
  )
}

export default IngredientsView
