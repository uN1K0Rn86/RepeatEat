import type { Invite } from '@repeateat/shared'
import axios from 'axios'

const baseUrl = '/api/invite'

const acceptInvite = async (invite: Invite): Promise<Invite> => {
  const response = await axios.post<Invite>(
    `${baseUrl}/${invite.id}/accept`,
    invite,
  )

  return response.data
}

const declineInvite = async (invite: Invite): Promise<Invite> => {
  const response = await axios.post<Invite>(
    `${baseUrl}/${invite.id}/decline`,
    invite,
  )

  return response.data
}

export default { acceptInvite, declineInvite }
