import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useAddHouseholdRecipe, useUserHouseholds } from '@/hooks/useHousehold'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface AddToHouseholdButtonProps {
  recipeId: string
  source: 'list' | 'view'
}

const AddToHouseholdButton = ({
  recipeId,
  source,
}: AddToHouseholdButtonProps) => {
  const { t } = useTranslation(['household'])
  const { data: userHouseholds } = useUserHouseholds()
  const addHouseholdRecipeMutation = useAddHouseholdRecipe()

  const handleAddToHousehold = (
    e: React.MouseEvent<HTMLElement>,
    householdId: number,
  ) => {
    e.preventDefault()
    e.stopPropagation()
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
              onClick={(e) =>
                handleAddToHousehold(e, userHouseholds[0].householdId)
              }
            >
              {source === 'view' ? t('household:add_recipe') : <Plus />}
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className="bg-green-300 hover:bg-green-400"
                >
                  {source === 'view' ? t('household:add_recipe') : <Plus />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {source === 'list' && (
                  <div>
                    <DropdownMenuLabel>
                      {t('household:add_recipe')}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </div>
                )}
                {userHouseholds.map((h) => (
                  <DropdownMenuItem
                    key={h.householdId}
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      handleAddToHousehold(e, h.householdId)
                    }
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
