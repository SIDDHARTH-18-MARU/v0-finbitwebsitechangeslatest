"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Upload, CheckCircle, AlertCircle, GraduationCap, User, FileText, ArrowLeft, Shield, Clock } from "lucide-react"
import Link from "next/link"

export default function VerifyStudentPage() {
  const [step, setStep] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    collegeName: "",
    studentId: "",
    course: "",
    graduationYear: "",
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleSubmit = () => {
    setIsVerifying(true)
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)
      setVerificationComplete(true)
      setStep(4)
    }, 3000)
  }

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.fullName && formData.email && formData.phone
      case 2:
        return formData.collegeName && formData.studentId && formData.course && formData.graduationYear
      case 3:
        return uploadedFile
      default:
        return false
    }
  }

  const progress = ((step - 1) / 3) * 100

  return (
    <main className="min-h-screen relative">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/#pricing"
              className="inline-flex items-center text-primary hover:text-accent transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pricing
            </Link>
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Student Verification</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get verified as a student to unlock exclusive pricing and features designed just for you.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of 4</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {step === 1 && <User className="w-6 h-6 text-primary" />}
                {step === 2 && <GraduationCap className="w-6 h-6 text-primary" />}
                {step === 3 && <Upload className="w-6 h-6 text-primary" />}
                {step === 4 && <CheckCircle className="w-6 h-6 text-green-500" />}

                {step === 1 && "Personal Information"}
                {step === 2 && "Academic Details"}
                {step === 3 && "Document Upload"}
                {step === 4 && "Verification Complete"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@college.edu"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1"
                    />
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Privacy Protected</h4>
                        <p className="text-sm text-muted-foreground">
                          Your personal information is encrypted and will only be used for student verification
                          purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="collegeName">College/University Name *</Label>
                    <Input
                      id="collegeName"
                      value={formData.collegeName}
                      onChange={(e) => handleInputChange("collegeName", e.target.value)}
                      placeholder="e.g., Indian Institute of Technology Delhi"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="studentId">Student ID *</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange("studentId", e.target.value)}
                        placeholder="Your student ID number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="graduationYear">Expected Graduation *</Label>
                      <Input
                        id="graduationYear"
                        value={formData.graduationYear}
                        onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                        placeholder="e.g., 2025"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="course">Course/Program *</Label>
                    <Input
                      id="course"
                      value={formData.course}
                      onChange={(e) => handleInputChange("course", e.target.value)}
                      placeholder="e.g., B.Tech Computer Science"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold">
                      Upload Student ID Card or Enrollment Certificate *
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Please upload a clear photo of your student ID card or official enrollment certificate.
                    </p>

                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      {!uploadedFile ? (
                        <div>
                          <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                          <p className="text-lg font-medium text-foreground mb-2">Choose file to upload</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Supported formats: JPG, PNG, PDF (Max 5MB)
                          </p>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="document-upload"
                          />
                          <label htmlFor="document-upload">
                            <Button asChild className="cursor-pointer">
                              <span>
                                <Upload className="w-4 h-4 mr-2" />
                                Select File
                              </span>
                            </Button>
                          </label>
                        </div>
                      ) : (
                        <div>
                          <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
                          <p className="text-lg font-medium text-green-600 mb-2">File uploaded successfully!</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                          <Button variant="outline" onClick={() => setUploadedFile(null)} className="bg-transparent">
                            Upload Different File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-accent mb-1">Quick Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          Most verifications are processed within 24 hours. You'll receive an email confirmation once
                          approved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Verification Complete */}
              {step === 4 && (
                <div className="text-center space-y-6">
                  {isVerifying ? (
                    <div>
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Verifying Your Information...</h3>
                      <p className="text-muted-foreground">Please wait while we process your student verification.</p>
                    </div>
                  ) : verificationComplete ? (
                    <div>
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Verification Successful!</h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        Congratulations! You're now eligible for student pricing.
                      </p>

                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-6">
                        <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground mb-3">
                          Student Discount Activated
                        </Badge>
                        <div className="text-3xl font-bold text-foreground mb-2">
                          ₹39<span className="text-lg font-normal text-muted-foreground">/month</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Save ₹10/month with student pricing</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow-button"
                        >
                          Start Your Student Plan
                        </Button>
                        <Button variant="outline" size="lg" asChild className="bg-transparent">
                          <Link href="/#pricing">View All Plans</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Verification Failed</h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        Sorry, we couldn't verify your student status. Please try again.
                      </p>
                      <Button
                        onClick={() => setStep(1)}
                        className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                      >
                        Retry Verification
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 4 && !isVerifying && (
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="bg-transparent"
                  >
                    Previous
                  </Button>

                  {step < 3 ? (
                    <Button
                      onClick={() => setStep(step + 1)}
                      disabled={!isStepComplete(step)}
                      className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!isStepComplete(step)}
                      className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    >
                      Submit for Verification
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits Section */}
          {step < 4 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-glow text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Student Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    Get FinBit Pro for just ₹39/month with valid student verification
                  </p>
                </CardContent>
              </Card>

              <Card className="card-glow text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Secure Process</h3>
                  <p className="text-sm text-muted-foreground">
                    Your documents are encrypted and automatically deleted after verification
                  </p>
                </CardContent>
              </Card>

              <Card className="card-glow text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Quick Approval</h3>
                  <p className="text-sm text-muted-foreground">Most verifications are processed within 24 hours</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
