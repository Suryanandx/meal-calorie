import { z } from "zod"

export const calorieSchema = z.object({
  dish_name: z.string().min(1, "Dish name is required"),
  servings: z.number().min(0.1, "Servings must be at least 0.1").max(20, "Servings cannot exceed 20"),
})

export type CalorieFormData = z.infer<typeof calorieSchema>
