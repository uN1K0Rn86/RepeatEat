import { z } from 'zod'

export const householdBaseSchema = z.object({
  name: z.string().min(2, 'errors:name_required'),
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

export const inviteBaseSchema = z.object({
  email: z.email('errors:invalid_email'),
})

export const inviteSchema = inviteBaseSchema.extend({
  id: z.number(),
  householdId: z.number(),
  invitedBy: z.string(),
  status: z.enum(['pending', 'accepted', 'declined']),
  token: z.string(),
  sentAt: z.iso.datetime(),
  expiresAt: z.iso.datetime(),
  household: householdResponseSchema,
})

export const inviteResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.number(),
    email: z.email(),
    status: z.enum(['pending', 'accepted', 'declined']),
    sentAt: z.iso.datetime(),
    expiresAt: z.iso.datetime(),
  }),
})

const householdRecipeResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    householdId: z.number(),
    recipeId: z.number(),
    addedBy: z.string(),
  }),
})

export const householdRecipeSchema = z.object({
  recipeId: z.number(),
  householdId: z.number(),
  addedBy: z.string().nullable(),
  recipe: z.object({
    id: z.number(),
    name: z.string(),
    authorId: z.string().nullable(),
    private: z.boolean(),
  }),
})

const createCookLogSchema = z.object({
  recipeId: z.number(),
  notes: z.string().max(500).optional(),
  cookedAt: z.coerce.date().optional(),
})

const addCookLogInputSchema = createCookLogSchema.extend({
  householdId: z.number(),
  cookedBy: z.string(),
})

const cookLogSchema = addCookLogInputSchema.extend({
  id: z.number().positive(),
})

export type UserHousehold = z.infer<typeof userHouseholdSchema>
export type HouseholdMember = z.infer<typeof householdMembersSchema>
export type InviteResponse = z.infer<typeof inviteResponseSchema>
export type Invite = z.infer<typeof inviteSchema>
export type HouseholdRecipeResponse = z.infer<
  typeof householdRecipeResponseSchema
>
export type HouseholdRecipe = z.infer<typeof householdRecipeSchema>
export type HouseholdResponse = z.infer<typeof householdResponseSchema>
export type CreateCookLog = z.infer<typeof createCookLogSchema>
export type AddCookLogInput = z.infer<typeof addCookLogInputSchema>
export type CookLog = z.infer<typeof cookLogSchema>
