import { useNavigate } from 'react-router-dom'

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'

const RecipeDropdownMenu = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['recipe'])

  return (
    <>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuItem onClick={() => void navigate('/recipe')}>
          {t('recipe:browse')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => void navigate('/recipe/add')}>
          {t('recipe:add_recipe')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  )
}

export default RecipeDropdownMenu
