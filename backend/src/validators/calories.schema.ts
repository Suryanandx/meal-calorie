import { z } from 'zod';

export const calorieRequestSchema = z.object({
  dish_name: z.string().min(2, 'Dish name must be at least 2 characters'),
  servings: z
    .number({ invalid_type_error: 'Servings must be a number' })
    .positive('Servings must be greater than 0'),
});
