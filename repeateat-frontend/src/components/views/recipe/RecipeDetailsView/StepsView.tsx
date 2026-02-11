import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type UpdateRecipe } from '@repeateat/shared'
import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface StepsProps {
  editable: boolean
}

const StepsView = ({ editable }: StepsProps) => {
  const { t } = useTranslation(['common'])
  const { register, control, getValues } = useFormContext<UpdateRecipe>()

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'steps',
  })

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row gap-3">
          <div>{index + 1}. </div>
          <div>
            {editable ? (
              <Input {...register(`steps.${index}.content`)} />
            ) : (
              field.content
            )}
          </div>
          {editable && (
            <div className="flex flex-row items-center">
              <div className="flex flex-col">
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => move(index, index - 1)}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                )}
                {index !== fields.length - 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => move(index, index + 1)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button
                className="w-6 h-6"
                type="button"
                variant="outline"
                onClick={() =>
                  window.confirm(t('common:confirm_delete')) && remove(index)
                }
              >
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          )}
        </div>
      ))}
      {editable && (
        <Button
          className="w-full"
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              content: '',
              stepNumber: fields.length + 1,
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

export default StepsView
