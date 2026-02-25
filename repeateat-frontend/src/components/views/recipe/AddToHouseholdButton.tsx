import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useAddHouseholdRecipe, useUserHouseholds } from '@/hooks/useHousehold'
import { useTranslation } from 'react-i18next'

interface AddToHouseholdButtonProps {
  recipeId: string
}

const AddToHouseholdButton = ({ recipeId }: AddToHouseholdButtonProps) => {
  const { t } = useTranslation(['household'])
  const { data: userHouseholds } = useUserHouseholds()
  const addHouseholdRecipeMutation = useAddHouseholdRecipe()

  const handleAddToHousehold = (householdId: number) => {
    addHouseholdRecipeMutation.mutate({
      householdId,
      recipeId,
    })
  }

  return (
    <>
      {userHouseholds && userHouseholds.length > 0 && (
        <div className="ml-auto">
          {userHouseholds.length === 1 ? (
            <Button
              type="button"
              className="bg-green-300 hover:bg-green-400"
              onClick={() =>
                handleAddToHousehold(userHouseholds[0].householdId)
              }
            >
              {t('household:add_recipe')}
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className="bg-green-300 hover:bg-green-400"
                >
                  {t('household:add_recipe')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userHouseholds.map((h) => (
                  <DropdownMenuItem
                    key={h.householdId}
                    onClick={() => handleAddToHousehold(h.householdId)}
                  >
                    {h.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </>
  )
}

export default AddToHouseholdButton
