"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuthStore } from "@/stores/authStore";
import { Menu, X } from "lucide-react";

export function Header() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-14 items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center space-x-2 rounded-sm btn-focus"
          aria-label="Calorie Tracker - Go to homepage"
        >
          <span className="font-bold">Calorie Tracker</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center space-x-4"
          role="navigation"
          aria-label="Main navigation"
        >
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

        {/* Actions */}
        <div
          className="hidden md:flex items-center space-x-2"
          role="toolbar"
          aria-label="User actions"
        >
          <ThemeToggle />
          {isAuthenticated() ? (
            <>
              <span className="text-sm">Hello, {user?.first_name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="btn-focus bg-transparent"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="btn-focus">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="btn-focus">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2">
          <nav
            role="navigation"
            aria-label="Mobile navigation"
            className="space-y-1"
          >
            {isAuthenticated() && (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  Dashboard
                </Link>
                <Link
                  href="/calories"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  Track Calories
                </Link>
              </>
            )}
          </nav>

          <div
            role="toolbar"
            aria-label="Mobile user actions"
            className="space-y-1"
          >
            <ThemeToggle />
            {isAuthenticated() ? (
              <>
                <div className="text-sm">Hello, {user?.first_name}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="w-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button size="sm" asChild className="w-full">
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
