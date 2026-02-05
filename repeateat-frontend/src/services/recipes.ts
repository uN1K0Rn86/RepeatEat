import axios from 'axios'

import type { Category } from '@repeateat/shared'

const baseUrl = '/api/recipe'

const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(`${baseUrl}/category`)
  return data
}

export { getCategories }
