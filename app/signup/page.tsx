"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowLeft, Mail, Lock, User, Phone, Eye, EyeOff, Smartphone, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

  const handleSignup = async () => {
    setIsLoading(true)
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 2000)
  }

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8
    )
  }

  return (
    <main className="min-h-screen relative">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <Link
                  href="/"
                  className="inline-flex items-center text-primary hover:text-accent transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Start Your Free Trial</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of students and young professionals who are taking control of their finances with
                  FinBit.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Signup Form */}
                <Card className="card-glow">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          className="pl-10 mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
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
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          className="pl-10 mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="Create a strong password"
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
                      <p className="text-xs text-muted-foreground mt-1">Must be at least 8 characters long</p>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          placeholder="Confirm your password"
                          className="pl-10 mt-1"
                        />
                      </div>
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>

                    <Button
                      onClick={handleSignup}
                      disabled={!isFormValid() || isLoading}
                      className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground glow-button"
                      size="lg"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        "Start Free Trial"
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By signing up, you agree to our{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <div className="space-y-6">
                  <Card className="card-glow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">What you get with your free trial:</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">30 days completely free</p>
                            <p className="text-sm text-muted-foreground">No credit card required</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Full access to all features</p>
                            <p className="text-sm text-muted-foreground">AI categorization, bill splitting, and more</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Offline SMS parsing</p>
                            <p className="text-sm text-muted-foreground">Track expenses without internet</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Cancel anytime</p>
                            <p className="text-sm text-muted-foreground">No commitment, no hidden fees</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="card-glow text-center">
                      <CardContent className="p-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Smartphone className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">Mobile First</h4>
                        <p className="text-xs text-muted-foreground">Designed for your smartphone</p>
                      </CardContent>
                    </Card>

                    <Card className="card-glow text-center">
                      <CardContent className="p-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-5 h-5 text-accent" />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">Secure</h4>
                        <p className="text-xs text-muted-foreground">Bank-grade encryption</p>
                      </CardContent>
                    </Card>

                    <Card className="card-glow text-center">
                      <CardContent className="p-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">Fast Setup</h4>
                        <p className="text-xs text-muted-foreground">Ready in under 2 minutes</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Welcome to FinBit!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your account has been created successfully. Check your email for verification instructions.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Next Steps:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                    <p className="text-foreground">Check your email and verify your account</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <p className="text-foreground">Download the FinBit mobile app</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                    <p className="text-foreground">Start tracking your expenses automatically</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow-button"
                >
                  Download Mobile App
                </Button>
                <Button variant="outline" size="lg" asChild className="bg-transparent">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                Need help getting started?{" "}
                <Link href="/support" className="text-primary hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
