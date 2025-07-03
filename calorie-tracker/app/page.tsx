import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Track Your Calories</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Easily track your meals and monitor your calorie intake with our simple and intuitive calorie tracker.
          </p>
        </div>

        <div className="space-x-4">
          <Button asChild size="lg" className="btn-focus">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="btn-focus bg-transparent">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2 p-6 rounded-lg border bg-card text-card-foreground">
              <h3 className="text-xl font-semibold">Easy Tracking</h3>
              <p className="text-muted-foreground">
                Simply enter your dish name and servings to get instant calorie information.
              </p>
            </div>
            <div className="space-y-2 p-6 rounded-lg border bg-card text-card-foreground">
              <h3 className="text-xl font-semibold">Meal History</h3>
              <p className="text-muted-foreground">
                Keep track of all your meals and monitor your daily calorie intake.
              </p>
            </div>
            <div className="space-y-2 p-6 rounded-lg border bg-card text-card-foreground">
              <h3 className="text-xl font-semibold">USDA Data</h3>
              <p className="text-muted-foreground">
                Get accurate calorie information powered by USDA nutritional database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
