import { useTranslation } from 'react-i18next'

interface IngredientProps {
  ingredients: {
    quantity: number
    unit: string
    recipeId: number
    ingredientId: number
    ingredient: {
      name: string
      id: number
    }
  }[]
}

const IngredientsView = ({ ingredients }: IngredientProps) => {
  const { t } = useTranslation(['recipe', 'common'])

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse mx-auto text-xs sm:text-sm md:text-base">
        <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            <th className="border px-4 py-2 text-left font-bold w-1/2">
              {t('common:name')}
            </th>
            <th className="border px-4 py-2 text-left font-bold">
              {t('recipe:quantity')}
            </th>
            <th className="border px-4 py-2 text-left font-bold">
              {t('recipe:unit')}
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing) => (
            <tr
              key={ing.ingredient.id}
              className="even:bg-muted m-0 border-t p-0"
            >
              <th className="border px-4 py-2 text-left w-1/2">
                {ing.ingredient.name}
              </th>
              <th className="border px-4 py-2">{ing.quantity}</th>
              <th className="border px-4 py-2">{ing.unit}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IngredientsView
