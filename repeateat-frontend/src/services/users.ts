import axios from 'axios'
import type { User } from 'better-auth'
import type { Invite, UserProfile } from '@repeateat/shared'

export type UserWithInfo = User & {
  invites: Invite[]
  defaultHouseholdId: number | null
}

interface MeResponse {
  user: UserWithInfo
}

const baseUrl = '/api/user'

const me = async (): Promise<UserWithInfo | null> => {
  try {
    const response = await axios.get<MeResponse>(`${baseUrl}/me`)
    return response.data.user
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      if (
        status === 401 ||
        status === 403 ||
        status === 502 ||
        status === 503 ||
        status === 504 ||
        !error.response
      ) {
        return null
      }
    }
    throw error
  }
}

const setDefaultHousehold = async (
  householdId: number,
): Promise<UserProfile> => {
  const response = await axios.put<UserProfile>(
    `${baseUrl}/profile/default-household`,
    { newDefaultId: householdId },
  )

  return response.data
}

const getUserInfo = async (userId: string): Promise<User> => {
  const response = await axios.get<User>(`${baseUrl}/${userId}`)

  return response.data
}

export default { getUserInfo, me, setDefaultHousehold }
