import type { UserHousehold } from '@repeateat/shared'
import axios from 'axios'

const baseUrl = '/api/household'

const getUserHouseholds = async (): Promise<UserHousehold[]> => {
  const response = await axios.get<UserHousehold[]>(baseUrl)
  return response.data
}

export default { getUserHouseholds }
