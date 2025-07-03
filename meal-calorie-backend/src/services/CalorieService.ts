import axios from "axios";
import fuzzysort from "fuzzysort";
import { USDAFoodItem } from "../types/usda";
import { logger } from "../utils/logger";

const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

export interface ICalorieService {
  getCalories(dish: string): Promise<number | null>;
}

export class CalorieService implements ICalorieService {
  private cache = new Map<string, number>();

  public async getCalories(dish: string): Promise<number | null> {
    const normalizedDish = dish.trim().toLowerCase();

    if (!normalizedDish) {
      logger.warn("Dish name is empty or invalid");
      return null;
    }

    if (this.cache.has(normalizedDish)) {
      logger.debug({ dish: normalizedDish }, "Returning calories from cache");
      return this.cache.get(normalizedDish)!;
    }

    try {
      const foods = await this.fetchUSDAFoods(normalizedDish);
      if (!foods.length) {
        logger.info({ dish: normalizedDish }, "No USDA foods found");
        return null;
      }

      const bestMatch = this.findBestMatch(normalizedDish, foods);
      if (!bestMatch) {
        logger.info({ dish: normalizedDish }, "No fuzzy match found");
        return null;
      }

      const calories = this.extractCalories(bestMatch);
      if (calories === null) {
        logger.warn(
          { dish: normalizedDish },
          "Calories not found in nutrient list"
        );
        return null;
      }

      this.cache.set(normalizedDish, calories);
      return calories;
    } catch (err) {
      logger.error({ err, dish }, "Error in CalorieService");
      return null;
    }
  }

  private async fetchUSDAFoods(query: string): Promise<USDAFoodItem[]> {
    try {
      const response = await axios.get(USDA_API_URL, {
        params: {
          query,
          api_key: process.env.USDA_API_KEY,
          pageSize: 10,
        },
      });
      return response.data?.foods || [];
    } catch (err) {
      logger.error({ err, query }, "Failed to fetch foods from USDA API");
      throw err;
    }
  }

  private findBestMatch(
    dish: string,
    foods: USDAFoodItem[]
  ): USDAFoodItem | null {
    const matches = fuzzysort.go<USDAFoodItem>(dish, foods, {
      key: "description",
    });
    return matches.length > 0 ? matches[0].obj : null;
  }

  private extractCalories(item: USDAFoodItem): number | null {
    const energy = item.foodNutrients.find(
      (n) => n.nutrientName === "Energy" && n.unitName === "KCAL"
    );
    return energy?.value ?? null;
  }
}

export const calorieService = new CalorieService();
