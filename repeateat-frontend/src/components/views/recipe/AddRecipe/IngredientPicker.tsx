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
      <Field>
        <Button
          className="max-w-xs"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: '', quantity: 0, unit: '' })}
        >
          <Plus className="w-4 h-4 mr-1" />
          {t('common:add')}
        </Button>
      </Field>
      <div>
        <table className="w-full">
          <thead>
            <tr className="even:bg-muted m-0 border-t p-0">
              <th className="border px-4 py-2 text-left font-bold">
                {t('common:name')}
              </th>
              <th className="border px-4 py-2 text-left font-bold">
                {t('recipe:quantity')}
              </th>
              <th className="border px-4 py-2 text-left font-bold">
                {t('recipe:unit')}
              </th>
              <th className="border px-4 py-2 text-left font-bold">
                {t('common:remove')}
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
                  <th className="flex-1">
                    <Input
                      {...register(`ingredients.${index}.name`)}
                      placeholder={t('recipe:ingredient_name')}
                    />
                    {nameError?.message && (
                      <p className="text-xs text-destructive mt-1">
                        {nameError.message}
                      </p>
                    )}
                  </th>
                  <th className="w-24">
                    <Input
                      {...register(`ingredients.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Qty"
                    />
                  </th>
                  <th className="w-24">
                    <Input
                      {...register(`ingredients.${index}.unit`)}
                      placeholder="eg. kg"
                    />
                  </th>
                  <th>
                    <Button
                      className="w-full"
                      type="button"
                      variant="outline"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </FieldGroup>
  )
}

export default IngredientPicker
