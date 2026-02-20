import axios from 'axios'
import type { User } from 'better-auth'

interface MeResponse {
  user: User
}

const baseUrl = '/api/user'

const me = async (): Promise<User | null> => {
  try {
    const response = await axios.get<MeResponse>(`${baseUrl}/me`)
    return response.data.user
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null
    }
    throw error
  }
}

export default { me }
