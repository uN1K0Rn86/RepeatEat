import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    name: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const userProfileSchema = z.object({
  userId: z.string(),
  defaultHouseholdId: z.number().optional(),
  householdName: z.string().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
