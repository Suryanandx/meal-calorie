"use client"

import { useAuthGuard } from "@/lib/auth"
import { useAuthStore } from "@/stores/authStore"
import { useMealStore } from "@/stores/mealStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const isAuthenticated = useAuthGuard()
  const user = useAuthStore((state) => state.user)
  const meals = useMealStore((state) => state.meals)

  if (!isAuthenticated) {
    return null
  }

  const totalCaloriesToday = meals
    .filter((meal) => {
      const today = new Date().toDateString()
      const mealDate = new Date(meal.date).toDateString()
      return today === mealDate
    })
    .reduce((sum, meal) => sum + meal.total_calories, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome back, {user?.first_name}!</h1>
          <p className="text-muted-foreground">Here's your calorie tracking overview for today.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Calories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCaloriesToday}</div>
              <p className="text-xs text-muted-foreground">calories consumed today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{meals.length}</div>
              <p className="text-xs text-muted-foreground">total meals logged</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Action</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/calories">Track New Meal</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Meals</CardTitle>
          </CardHeader>
          <CardContent>
            {meals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No meals tracked yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/calories">Track Your First Meal</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {meals.slice(0, 5).map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{meal.dish_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {meal.servings} serving{meal.servings !== 1 ? "s" : ""} •{" "}
                        {new Date(meal.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{meal.total_calories} cal</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
