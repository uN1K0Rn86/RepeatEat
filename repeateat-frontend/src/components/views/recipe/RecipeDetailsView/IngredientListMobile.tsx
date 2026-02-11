import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { IngredientsFields } from './IngredientsView'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { type UpdateRecipe } from '@repeateat/shared'

interface MobileListProps {
  fields: IngredientsFields['fields']
  remove: IngredientsFields['remove']
  editable: boolean
}

const IngredientListMobile = ({
  fields,
  remove,
  editable,
}: MobileListProps) => {
  const { t } = useTranslation(['common', 'recipe'])
  const { register } = useFormContext<UpdateRecipe>()

  return (
    <div className="flex flex-col gap-3">
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
  )
}

export default IngredientListMobile
