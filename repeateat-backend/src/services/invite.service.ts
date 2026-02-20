import { eq } from 'drizzle-orm'
import { Invite } from '@repeateat/shared'

import { householdInvite, householdUser } from '../db/schema'
import db from '../db'

const acceptInvite = async (invite: Invite, userId: string) => {
  const inviteToReturn = await db.transaction(async (tx) => {
    const [acceptedInvite] = await tx
      .update(householdInvite)
      .set({ status: 'accepted' })
      .where(eq(householdInvite.id, invite.id))
      .returning()

    await tx
      .insert(householdUser)
      .values({ householdId: invite.householdId, userId, role: 'member' })
      .returning()
    return acceptedInvite
  })

  return inviteToReturn
}

export { acceptInvite }
