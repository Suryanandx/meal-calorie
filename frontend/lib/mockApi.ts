import type { LoginData, RegisterData, AuthResponse } from "@/types/auth"
import type { CalorieRequest, CalorieResponse } from "@/types/calorie"

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function mockLogin(data: LoginData): Promise<AuthResponse> {
  await delay(1000)

  // Simple mock validation
  if (data.email === "test@example.com" && data.password === "password") {
    return {
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: "user-1",
        first_name: "John",
        email: data.email,
      },
    }
  }

  throw new Error("Invalid credentials")
}

export async function mockRegisterUser(data: RegisterData): Promise<{ message: string }> {
  await delay(1000)

  // Mock successful registration
  return { message: "User created successfully" }
}

export async function mockGetCalories(data: CalorieRequest): Promise<CalorieResponse> {
  await delay(800)

  // Mock calorie calculation based on dish name
  const calorieMap: Record<string, number> = {
    apple: 95,
    banana: 105,
    "chicken breast": 165,
    rice: 130,
    pasta: 220,
    pizza: 285,
    salad: 50,
  }

  const dishLower = data.dish_name.toLowerCase()
  const baseCalories = calorieMap[dishLower] || 200 // default calories

  return {
    dish_name: data.dish_name,
    servings: data.servings,
    calories_per_serving: baseCalories,
    total_calories: Math.round(data.servings * baseCalories),
    source: "USDA (mock)",
  }
}
