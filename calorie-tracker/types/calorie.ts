export interface CalorieRequest {
  dish_name: string
  servings: number
}

export interface CalorieResponse {
  dish_name: string
  servings: number
  calories_per_serving: number
  total_calories: number
  source: string
}

export interface Meal {
  id: string
  dish_name: string
  servings: number
  calories_per_serving: number
  total_calories: number
  date: string
}
