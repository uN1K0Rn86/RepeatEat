import { useController, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useCategories } from '@/hooks/useCategories'

import { type AddRecipe } from '@repeateat/shared'
import { FieldGroup, FieldLegend } from '@/components/ui/field'
import { Badge } from '@/components/ui/badge'

const CategoryPicker = () => {
  const { t } = useTranslation(['recipe', 'common'])
  const { control } = useFormContext<AddRecipe>()
  const { field } = useController({
    name: 'categories',
    control,
    defaultValue: [],
  })

  const toggleCategory = (id: number) => {
    const currentValues: number[] = field.value
    if (currentValues.includes(id)) {
      field.onChange(currentValues.filter((v) => v !== id))
    } else {
      field.onChange([...currentValues, id])
    }
  }

  const { data: categories, isLoading } = useCategories()

  if (isLoading) return <div>Loading</div>

  return (
    <FieldGroup>
      <FieldLegend>{t('recipe:categories')}</FieldLegend>
      <div className="flex flex-wrap gap-2">
        {categories?.map((cat) => {
          const isSelected = field.value.includes(cat.id)

          return (
            <Badge
              key={cat.id}
              variant={isSelected ? 'default' : 'outline'}
              className="cursor-pointer px-3 py-1 text-sm transition-all select-none"
              onClick={() => toggleCategory(cat.id)}
            >
              {cat.name}
              {isSelected && <span className="ml-1">✕</span>}
            </Badge>
          )
        })}
      </div>
    </FieldGroup>
  )
}

export default CategoryPicker
