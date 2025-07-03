import { create } from "zustand"
import type { Meal } from "@/types/calorie"

interface MealState {
  meals: Meal[]
  addMeal: (meal: Meal) => void
  clearMeals: () => void
}

export const useMealStore = create<MealState>((set) => ({
  meals: [],
  addMeal: (meal: Meal) => set((state) => ({ meals: [meal, ...state.meals] })),
  clearMeals: () => set({ meals: [] }),
}))
