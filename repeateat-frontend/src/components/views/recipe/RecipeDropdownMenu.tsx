import { useNavigate } from 'react-router-dom'

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

const RecipeDropdownMenu = () => {
  const navigate = useNavigate()
  return (
    <>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuItem onClick={() => void navigate('/recipe')}>
          Browse
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => void navigate('/recipe/add')}>
          Add Recipe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  )
}

export default RecipeDropdownMenu
