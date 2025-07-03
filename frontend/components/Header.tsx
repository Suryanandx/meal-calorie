"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useAuthStore } from "@/stores/authStore"

export function Header() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 rounded-sm btn-focus"
            aria-label="Calorie Tracker - Go to homepage"
          >
            <span className="font-bold">Calorie Tracker</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2" role="navigation" aria-label="Main navigation">
            {isAuthenticated() && (
              <>
                <Button variant="ghost" asChild className="btn-focus">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" asChild className="btn-focus">
                  <Link href="/calories">Track Calories</Link>
                </Button>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-2" role="toolbar" aria-label="User actions">
            <ThemeToggle />
            {isAuthenticated() ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm" aria-label={`Logged in as ${user?.first_name}`}>
                  Hello, {user?.first_name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="btn-focus bg-transparent"
                  aria-label="Log out of your account"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="btn-focus">
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="btn-focus">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
