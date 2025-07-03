"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { calorieSchema, type CalorieFormData } from "@/validators/calorie.schema"
import type { CalorieResponse } from "@/types/calorie"
import { AlertCircle } from "lucide-react"

interface MealFormProps {
  onSubmit: (data: CalorieFormData) => Promise<CalorieResponse>
  onResult: (result: CalorieResponse) => void
}

export function MealForm({ onSubmit, onResult }: MealFormProps) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const errorRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CalorieFormData>({
    resolver: zodResolver(calorieSchema),
    defaultValues: {
      servings: 1,
    },
  })

  // Focus error message when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus()
    }
  }, [error])

  const handleFormSubmit = async (data: CalorieFormData) => {
    setIsLoading(true)
    setError("")

    try {
      const result = await onSubmit(data)
      onResult(result)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Track Your Meal</CardTitle>
        <CardDescription>Enter the dish name and number of servings to get calorie information</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4" ref={errorRef} tabIndex={-1} role="alert" aria-live="polite">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="meal-dish-name">Dish Name</Label>
            <Input
              id="meal-dish-name"
              placeholder="e.g., Chicken Breast, Apple, Pizza"
              {...register("dish_name")}
              disabled={isLoading}
              aria-invalid={errors.dish_name ? "true" : "false"}
              aria-describedby={errors.dish_name ? "dish-name-error" : undefined}
              className="btn-focus"
            />
            {errors.dish_name && (
              <p id="dish-name-error" className="text-sm text-red-500" role="alert" aria-live="polite">
                {errors.dish_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="meal-servings">Number of Servings</Label>
            <Input
              id="meal-servings"
              type="number"
              step="0.1"
              min="0.1"
              max="20"
              {...register("servings", { valueAsNumber: true })}
              disabled={isLoading}
              aria-invalid={errors.servings ? "true" : "false"}
              aria-describedby={errors.servings ? "servings-error" : undefined}
              className="btn-focus"
            />
            {errors.servings && (
              <p id="servings-error" className="text-sm text-red-500" role="alert" aria-live="polite">
                {errors.servings.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full btn-focus"
            disabled={isLoading}
            aria-describedby={isLoading ? "meal-status" : undefined}
          >
            {isLoading ? "Calculating..." : "Get Calorie Information"}
          </Button>

          {isLoading && (
            <div id="meal-status" className="sr-only" aria-live="polite">
              Calculating calorie information, please wait...
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
