"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Smartphone, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled * 100)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard or home page after successful login
      window.location.href = "/dashboard"
    }, 2000)
  }

  const isFormValid = () => {
    return formData.email && formData.password && formData.password.length >= 8
  }

  return (
    <main className="min-h-screen relative">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-primary hover:text-accent transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Welcome Back</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sign in to your FinBit account to continue managing your finances.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Login Form */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="pl-10 mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 mt-1"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={!isFormValid() || isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground glow-button"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary hover:underline font-medium">
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-6">
              <Card className="card-glow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Why choose FinBit?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Smart Expense Tracking</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically categorize expenses from SMS and receipts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Bank-Grade Security</p>
                        <p className="text-sm text-muted-foreground">
                          Your financial data is protected with enterprise-level encryption
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Offline Functionality</p>
                        <p className="text-sm text-muted-foreground">Track expenses even without internet connection</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-glow bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg font-semibold text-foreground mb-2">New to FinBit?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start your free 30-day trial today. No credit card required.
                  </p>
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href="/signup">Start Free Trial</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
