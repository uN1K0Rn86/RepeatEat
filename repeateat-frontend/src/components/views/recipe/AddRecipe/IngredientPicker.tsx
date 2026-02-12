import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLegend } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { type AddRecipe } from '@repeateat/shared'
import { getFieldError } from '@/utils/form'

const IngredientPicker = () => {
  const { t } = useTranslation(['recipe', 'common'])
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AddRecipe>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  return (
    <FieldGroup>
      <FieldLegend>{t('recipe:ingredients')}</FieldLegend>

      {fields.length > 0 && (
        <div>
          <table className="w-full table-auto border-collapse mx-auto">
            <thead>
              <tr className="even:bg-muted m-0 border-t p-0">
                <th className="border p-2 text-left font-bold w-1/2">
                  {t('common:name')}
                </th>
                <th className="border p-2 text-left font-bold">
                  {t('recipe:quantity')}
                </th>
                <th className="border p-2 text-left font-bold">
                  {t('recipe:unit')}
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const nameError = getFieldError(
                  errors,
                  `ingredients.${index}.name`,
                )

                return (
                  <tr key={field.id} className="even:bg-muted m-0 border-t p-0">
                    <td className="border p-2">
                      <Input
                        {...register(`ingredients.${index}.name`)}
                        placeholder={t('recipe:ingredient_name')}
                      />
                      {nameError?.message && (
                        <p className="text-xs text-destructive mt-1">
                          {nameError.message}
                        </p>
                      )}
                    </td>
                    <td className="border p-2">
                      <Input
                        {...register(`ingredients.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        placeholder="Qty"
                        type="number"
                      />
                    </td>
                    <td className="border p-2">
                      <div className="flex flex-row gap-1">
                        <Input
                          {...register(`ingredients.${index}.unit`)}
                          placeholder="kg"
                        />
                        <Button
                          className="w-6 h-6"
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (window.confirm(t('common:confirm_delete'))) {
                              remove(index)
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <Field>
        <Button
          className="w-full"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: '', quantity: 0, unit: '' })}
        >
          <Plus className="w-4 h-4 mr-1" />
          {t('common:add')}
        </Button>
      </Field>
    </FieldGroup>
  )
}

export default IngredientPicker
