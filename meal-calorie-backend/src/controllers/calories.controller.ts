import { Request, Response } from 'express';
import { getCaloriesFromUSDA } from '../services/usda.service';

export const getCalorieInfo = async (req: Request, res: Response): Promise<void> => {
  const { dish_name, servings } = req.body;

  if (!dish_name || !servings || servings <= 0) {
    res.status(400).json({ error: 'Invalid dish name or servings' });
    return;
  }

  try {
    const caloriesPerServing = await getCaloriesFromUSDA(dish_name);

    if (caloriesPerServing === null) {
      res.status(404).json({ error: 'Dish not found in USDA database' });
      return;
    }

    const totalCalories = Math.round(caloriesPerServing * servings);

    res.status(200).json({
      dish_name,
      servings,
      calories_per_serving: caloriesPerServing,
      total_calories: totalCalories,
      source: 'USDA FoodData Central',
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data from USDA API' });
  }
};
