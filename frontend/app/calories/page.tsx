"use client"

import { useState } from "react"
import { useAuthGuard } from "@/lib/auth"
import { useMealStore } from "@/stores/mealStore"
import { MealForm } from "@/components/MealForm"
import { ResultCard } from "@/components/ResultCard"
import type { CalorieResponse } from "@/types/calorie"
import type { CalorieFormData } from "@/validators/calorie.schema"
import { getCalories } from "@/lib/api"

export default function CaloriesPage() {
  const isAuthenticated = useAuthGuard()
  const [result, setResult] = useState<CalorieResponse | null>(null)
  const addMeal = useMealStore((state) => state.addMeal)

  if (!isAuthenticated) {
    return null
  }

  const handleSubmit = async (formData: CalorieFormData) => {
    const response = await getCalories(formData)
    return response
  }

  const handleResult = (result: CalorieResponse) => {
    setResult(result)

    // Add to meal store
    addMeal({
      id: Date.now().toString(),
      dish_name: result.dish_name,
      servings: result.servings,
      calories_per_serving: result.calories_per_serving,
      total_calories: result.total_calories,
      date: new Date().toISOString(),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <MealForm onSubmit={handleSubmit} onResult={handleResult} />
        {result && <ResultCard data={result} />}
      </div>
    </div>
  )
}
