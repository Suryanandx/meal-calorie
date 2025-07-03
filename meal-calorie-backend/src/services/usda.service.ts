import axios from "axios";
import fuzzysort from "fuzzysort";
import { USDAFoodItem } from "../types/usda";

const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

export const getCaloriesFromUSDA = async (
  dish: string
): Promise<number | null> => {
  const res = await axios.get(USDA_API_URL, {
    params: {
      query: dish,
      api_key: process.env.USDA_API_KEY,
      pageSize: 10,
    },
  });

  const foods: USDAFoodItem[] = res.data.foods;
  if (!foods || foods.length === 0) return null;

  const fuzzyResult = fuzzysort.go<USDAFoodItem>(dish, foods, {
    key: "description",
  });

  if (!fuzzyResult.length) return null;

  const bestMatch = fuzzyResult[0].obj; // ✅ no longer unknown

  const energy = bestMatch.foodNutrients.find(
    (n) => n.nutrientName === "Energy" && n.unitName === "KCAL"
  );

  return energy ? energy.value : null;
};
