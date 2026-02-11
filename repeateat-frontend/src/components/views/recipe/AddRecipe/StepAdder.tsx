import { useTranslation } from 'react-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Field, FieldGroup, FieldLegend } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { type AddRecipe } from '@repeateat/shared'
import { getFieldError } from '@/utils/form'

const StepAdder = () => {
  const { t } = useTranslation(['recipe', 'common'])
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AddRecipe>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps',
  })

  return (
    <FieldGroup>
      <FieldLegend>{t('recipe:preparation')}</FieldLegend>
      {fields.map((field, index) => {
        const stepError = getFieldError(errors, `steps.${index}.content`)

        return (
          <div key={field.id} className="flex gap-2">
            <span className="font-medium text-muted-foreground">
              {index + 1}.
            </span>
            <div className="flex-1">
              <Input
                className="w-full"
                {...register(`steps.${index}.content`)}
                placeholder={t('recipe:step_content')}
              />
              {stepError?.message && (
                <p className="text-xs text-destructive mt-1">
                  {stepError.message}
                </p>
              )}
            </div>
            <div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        )
      })}
      <Field>
        <Button
          className="max-w-xs"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ content: '' })}
        >
          <Plus className="w-4 h-4 mr-1" />
          {t('common:add')}
        </Button>
      </Field>
    </FieldGroup>
  )
}

export default StepAdder
