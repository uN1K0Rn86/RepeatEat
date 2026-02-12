import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { IngredientsFields } from './IngredientsView'
import { type UpdateRecipe } from '@repeateat/shared'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface TableProps {
  fields: IngredientsFields['fields']
  editable: boolean
  remove?: IngredientsFields['remove']
}

const IngredientsTable = ({ fields, editable, remove }: TableProps) => {
  const { t } = useTranslation(['common', 'recipe'])
  const { register } = useFormContext<UpdateRecipe>()

  return (
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
                  type="number"
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
                <div className="flex flex-row gap-1 items-center">
                  <Input
                    {...register(`ingredients.${index}.unit`)}
                    className="text-xs sm:text-sm h-8"
                  />
                  <Button
                    className="w-6 h-6"
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (window.confirm(t('common:confirm_delete'))) {
                        remove?.(index)
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
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
  )
}

export default IngredientsTable
