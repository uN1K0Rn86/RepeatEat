import axios from 'axios'
import type { User } from 'better-auth'

interface MeResponse {
  user: User
}

const baseUrl = '/api/user'

const me = async (): Promise<User> => {
  const response = await axios.get<MeResponse>(`${baseUrl}/me`)
  const userInfo = response.data.user

  return userInfo
}

export default { me }
