import { useEffect } from 'react'

import { useBoundStore } from '@/store'

const RecipeView = () => {
  const { setPageTitle } = useBoundStore()

  useEffect(() => {
    setPageTitle('Recipes')
  }, [setPageTitle])

  return <div></div>
}

export default RecipeView
