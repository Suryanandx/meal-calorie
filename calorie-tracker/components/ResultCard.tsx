import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CalorieResponse } from "@/types/calorie"

interface ResultCardProps {
  data: CalorieResponse
}

export function ResultCard({ data }: ResultCardProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {data.dish_name}
          <Badge variant="secondary">{data.source}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Servings</p>
            <p className="text-2xl font-bold">{data.servings}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Calories per Serving</p>
            <p className="text-2xl font-bold">{data.calories_per_serving}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Calories</p>
            <p className="text-3xl font-bold text-primary">{data.total_calories}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
