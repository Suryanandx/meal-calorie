import axios from "axios";
import fuzzysort from "fuzzysort";
import { USDAFoodItem } from "../types/usda";

const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

export interface ICalorieService {
  getCalories(dish: string): Promise<number | null>;
}

export class CalorieService implements ICalorieService {
  private cache = new Map<string, number>();

  public async getCalories(dish: string): Promise<number | null> {
    const normalizedDish = dish.trim().toLowerCase();

    // Step 1: Check cache
    if (this.cache.has(normalizedDish)) {
      return this.cache.get(normalizedDish)!;
    }

    try {
      const foods = await this.fetchUSDAFoods(dish);
      if (!foods.length) return null;

      const bestMatch = this.findBestMatch(dish, foods);
      if (!bestMatch) return null;

      const calories = this.extractCalories(bestMatch);
      if (calories === null) return null;

      this.cache.set(normalizedDish, calories);
      return calories;
    } catch (err) {
      console.error("🔴 CalorieService error:", err);
      return null;
    }
  }

  private async fetchUSDAFoods(query: string): Promise<USDAFoodItem[]> {
    const response = await axios.get(USDA_API_URL, {
      params: {
        query,
        api_key: process.env.USDA_API_KEY,
        pageSize: 10,
      },
    });

    return response.data?.foods || [];
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
