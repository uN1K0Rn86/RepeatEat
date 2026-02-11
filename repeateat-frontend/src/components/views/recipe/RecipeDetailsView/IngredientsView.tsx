import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { type UpdateRecipe } from '@repeateat/shared'
import {
  useFieldArray,
  useFormContext,
  type UseFieldArrayReturn,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IngredientsTable from './IngredientsTable'
import IngredientListMobile from './IngredientListMobile'

export interface IngredientProps {
  editable: boolean
}

export type IngredientsFields = UseFieldArrayReturn<UpdateRecipe, 'ingredients'>

const IngredientsView = ({ editable }: IngredientProps) => {
  const { t } = useTranslation(['recipe', 'common'])
  const { control, getValues } = useFormContext<UpdateRecipe>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  return (
    <div className="flex flex-col w-full overflow-x-auto gap-2">
      {/* Mobile View */}
      <div className="sm:hidden">
        {editable ? (
          <IngredientListMobile
            fields={fields}
            remove={remove}
            editable={editable}
          />
        ) : (
          <IngredientsTable fields={fields} editable={editable} />
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <IngredientsTable fields={fields} editable={editable} remove={remove} />
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
