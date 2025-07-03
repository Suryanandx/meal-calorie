import Link from "next/link"
import { LoginForm } from "@/components/AuthForm"

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <LoginForm />

        <div className="text-center text-sm">
          {"Don't have an account? "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </div>

        <div className="rounded-lg bg-muted p-4 text-center text-xs text-muted-foreground">
          <p className="font-medium mb-1">Demo credentials:</p>
          <p>Email: test@example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  )
}
