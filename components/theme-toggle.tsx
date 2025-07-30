"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Sunset } from "lucide-react"

type Theme = "light" | "dark" | "night"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("mindease-theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Default to light theme
      applyTheme("light")
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    // Remove all theme classes
    root.classList.remove("light", "dark", "night")

    if (newTheme === "dark") {
      root.classList.add("dark")
      // Reset any custom properties
      root.style.removeProperty("--background")
      root.style.removeProperty("--foreground")
      root.style.removeProperty("--card")
      root.style.removeProperty("--card-foreground")
      root.style.removeProperty("--primary")
      root.style.removeProperty("--primary-foreground")
    } else if (newTheme === "night") {
      root.classList.add("dark") // Night mode extends dark mode
      // Apply night mode specific colors (low blue light)
      root.style.setProperty("--background", "15 23 42") // slate-900
      root.style.setProperty("--foreground", "248 250 252") // slate-50
      root.style.setProperty("--card", "30 41 59") // slate-800
      root.style.setProperty("--card-foreground", "248 250 252") // slate-50
      root.style.setProperty("--primary", "251 191 36") // amber-400 (warmer color)
      root.style.setProperty("--primary-foreground", "15 23 42") // slate-900
    } else {
      // Light mode - remove dark class and custom properties
      root.classList.remove("dark")
      root.style.removeProperty("--background")
      root.style.removeProperty("--foreground")
      root.style.removeProperty("--card")
      root.style.removeProperty("--card-foreground")
      root.style.removeProperty("--primary")
      root.style.removeProperty("--primary-foreground")
    }
  }

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "night"]
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setTheme(nextTheme)
    applyTheme(nextTheme)
    localStorage.setItem("mindease-theme", nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "night":
        return <Sunset className="h-4 w-4" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      case "night":
        return "Night"
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Sun className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Light</span>
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={cycleTheme}>
      {getThemeIcon()}
      <span className="ml-2 hidden sm:inline">{getThemeLabel()}</span>
    </Button>
  )
}
