import { useNavigate } from 'react-router-dom'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'

const RecipeDropdownMenu = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['recipe'])

  return (
    <>
      <DropdownMenuItem onClick={() => void navigate('/recipe')}>
        {t('recipe:browse')}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => void navigate('/recipe/add')}>
        {t('recipe:add_recipe')}
      </DropdownMenuItem>
    </>
  )
}

export default RecipeDropdownMenu
