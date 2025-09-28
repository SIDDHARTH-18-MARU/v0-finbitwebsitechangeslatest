"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
        <div className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-9 h-9 p-0 text-foreground hover:bg-accent/10 transition-colors border border-border/50 hover:border-accent/50"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-foreground hover:text-accent transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-foreground hover:text-accent transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
