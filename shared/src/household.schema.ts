import { z } from 'zod'

const householdBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
})

const householdResponseSchema = householdBaseSchema.extend({
  id: z.number(),
})

const userHouseholdSchema = z.object({
  householdId: z.number(),
  userId: z.string(),
  role: z.string(),
  household: householdResponseSchema,
})

export type UserHousehold = z.infer<typeof userHouseholdSchema>
