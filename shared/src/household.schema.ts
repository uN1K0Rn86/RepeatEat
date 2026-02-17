import { z } from 'zod'

export const householdBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
})

export const householdResponseSchema = householdBaseSchema.extend({
  id: z.number(),
})

export const householdMembersSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.email(),
  role: z.enum(['admin', 'member']),
  image: z.string().nullable(),
})

export const userHouseholdSchema = z.object({
  householdId: z.number(),
  name: z.string(),
  role: z.enum(['admin', 'member']),
  members: z.array(householdMembersSchema),
})

export const inviteSchema = z.object({
  email: z.email('errors:invalid_email'),
})

export type UserHousehold = z.infer<typeof userHouseholdSchema>
export type HouseholdMember = z.infer<typeof householdMembersSchema>
