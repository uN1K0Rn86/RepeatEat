import { Button } from '@/components/ui/button'
import { Field, FieldLegend } from '@/components/ui/field'
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
    <div>
      <FieldLegend>{t('recipe:ingredients')}</FieldLegend>

      <div className="flex flex-col gap-2 sm:hidden">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-3 border rounded-lg bg-card space-y-3"
          >
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

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold text-muted-foreground">
                {t('common:name')}
              </label>
              <Input
                {...register(`ingredients.${index}.name`)}
                className="h-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold text-muted-foreground">
                  {t('recipe:quantity')}
                </label>
                <Input
                  type="number"
                  {...register(`ingredients.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold text-muted-foreground">
                  {t('recipe:unit')}
                </label>
                <Input
                  {...register(`ingredients.${index}.unit`)}
                  className="h-9"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block">
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
                    <tr
                      key={field.id}
                      className="even:bg-muted m-0 border-t p-0"
                    >
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
                        <div className="flex flex-row gap-1 items-center">
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
      </div>
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
    </div>
  )
}

export default IngredientPicker
