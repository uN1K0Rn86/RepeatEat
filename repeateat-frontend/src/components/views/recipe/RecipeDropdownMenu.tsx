import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

const RecipeDropdownMenu = () => {
  return (
    <>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuItem onClick={() => console.log('dropping down')}>
          Add Recipe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  )
}

export default RecipeDropdownMenu
