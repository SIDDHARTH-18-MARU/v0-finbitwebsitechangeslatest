"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()

  const navigateToSection = (sectionId: string) => {
    if (pathname === "/") {
      // If on homepage, scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // If on other pages, navigate to homepage with hash
      window.location.href = `/#${sectionId}`
    }
    setIsOpen(false)
  }

  const navigateToHome = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      window.location.href = "/"
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      // Only track sections on homepage
      if (pathname !== "/") return

      const sections = ["features", "pricing", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const isLinkActive = (sectionId: string) => {
    if (pathname === "/") {
      return activeSection === sectionId
    }
    return false
  }

  return (
    <nav className="fixed top-0 w-full modern-nav z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-modern">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">FinBit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigateToSection("features")}
              className={`nav-link transition-all duration-300 hover:text-accent hover:scale-105 ${isLinkActive("features") ? "active" : ""}`}
            >
              Features
            </button>
            <button
              onClick={() => navigateToSection("pricing")}
              className={`nav-link transition-all duration-300 hover:text-accent hover:scale-105 ${isLinkActive("pricing") ? "active" : ""}`}
            >
              Pricing
            </button>
            <button
              onClick={() => navigateToSection("about")}
              className={`nav-link transition-all duration-300 hover:text-accent hover:scale-105 ${isLinkActive("about") ? "active" : ""}`}
            >
              About
            </button>
            <button
              onClick={() => navigateToSection("contact")}
              className={`nav-link transition-all duration-300 hover:text-accent hover:scale-105 ${isLinkActive("contact") ? "active" : ""}`}
            >
              Contact
            </button>
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="outline"
                className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="modern-button">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-dark border-t border-border">
              <button
                onClick={() => navigateToSection("features")}
                className={`block w-full text-left px-3 py-2 nav-link transition-all duration-300 hover:text-accent hover:bg-accent/10 rounded-md ${isLinkActive("features") ? "active" : ""}`}
              >
                Features
              </button>
              <button
                onClick={() => navigateToSection("pricing")}
                className={`block w-full text-left px-3 py-2 nav-link transition-all duration-300 hover:text-accent hover:bg-accent/10 rounded-md ${isLinkActive("pricing") ? "active" : ""}`}
              >
                Pricing
              </button>
              <button
                onClick={() => navigateToSection("about")}
                className={`block w-full text-left px-3 py-2 nav-link transition-all duration-300 hover:text-accent hover:bg-accent/10 rounded-md ${isLinkActive("about") ? "active" : ""}`}
              >
                About
              </button>
              <button
                onClick={() => navigateToSection("contact")}
                className={`block w-full text-left px-3 py-2 nav-link transition-all duration-300 hover:text-accent hover:bg-accent/10 rounded-md ${isLinkActive("contact") ? "active" : ""}`}
              >
                Contact
              </button>
              <div className="px-3 py-2 space-y-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full modern-button">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
