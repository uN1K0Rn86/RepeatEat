import axios from 'axios'
import type { User as BaseUser } from 'better-auth'
import type { Invite } from '@repeateat/shared'

export type UserWithInvites = BaseUser & {
  invites: Invite[]
}

interface MeResponse {
  user: UserWithInvites
}

const baseUrl = '/api/user'

const me = async (): Promise<UserWithInvites | null> => {
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
