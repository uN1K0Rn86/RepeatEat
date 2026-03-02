import axios from 'axios'
import type { User as BaseUser } from 'better-auth'
import type { Invite, UserProfile } from '@repeateat/shared'

export type UserWithInfo = BaseUser & {
  invites: Invite[]
  defaultHouseholdId: number
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null
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

export default { me, setDefaultHousehold }
