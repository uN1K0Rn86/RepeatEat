import { z } from "zod";

const recipeBaseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  ingredients: z.array(z.number()),
  steps: z.array(z.number()),
});

export const addRecipeSchema = recipeBaseSchema;

export const recipeSchema = recipeBaseSchema.extend({
  id: z.number().int().positive(),
  authorId: z.string(),
});

export type Recipe = z.infer<typeof recipeSchema>;
export type AddRecipe = z.infer<typeof addRecipeSchema>;
