import { z } from 'zod'

const householdBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
})

const householdResponseSchema = householdBaseSchema.extend({
  id: z.number(),
})

const householdMembersSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.email(),
  role: z.enum(['admin', 'member']),
  image: z.string().nullable(),
})

const userHouseholdSchema = z.object({
  householdId: z.number(),
  name: z.string(),
  role: z.enum(['admin', 'member']),
  members: z.array(householdMembersSchema),
})

export type UserHousehold = z.infer<typeof userHouseholdSchema>
export type HouseholdMember = z.infer<typeof householdMembersSchema>
