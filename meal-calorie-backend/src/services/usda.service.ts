import axios from 'axios';
import fuzzysort from 'fuzzysort';
import { USDAFoodItem } from '../types/usda';

const USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';
const calorieCache = new Map<string, number>();

/**
 * Fetch calorie information for a given dish using USDA API.
 * Uses in-memory cache and fuzzy matching for better performance and accuracy.
 *
 * @param dish Original dish name input from user
 * @returns Calories per serving or null if not found
 */
export const getCaloriesFromUSDA = async (dish: string): Promise<number | null> => {
  const normalizedDish = dish.trim().toLowerCase();

  // ✅ Step 1: Return cached result if available
  if (calorieCache.has(normalizedDish)) {
    return calorieCache.get(normalizedDish)!;
  }

  try {
    // ✅ Step 2: Fetch top 10 matches from USDA
    const response = await axios.get(USDA_API_URL, {
      params: {
        query: dish,
        api_key: process.env.USDA_API_KEY,
        pageSize: 10,
      },
    });

    const foods: USDAFoodItem[] = response.data.foods;
    if (!foods || foods.length === 0) return null;

    // ✅ Step 3: Fuzzy match user input with USDA descriptions
    const fuzzyMatches = fuzzysort.go<USDAFoodItem>(dish, foods, {
      key: 'description',
    });

    if (!fuzzyMatches.length) return null;

    const bestMatch = fuzzyMatches[0].obj;

    // ✅ Step 4: Extract Energy (kcal) nutrient
    const energy = bestMatch.foodNutrients.find(
      (n) => n.nutrientName === 'Energy' && n.unitName === 'KCAL'
    );

    if (!energy) return null;

    const calories = energy.value;

    // ✅ Step 5: Store in in-memory cache
    calorieCache.set(normalizedDish, calories);

    return calories;
  } catch (error) {
    console.error('🔴 Error fetching from USDA API:', error);
    return null;
  }
};
