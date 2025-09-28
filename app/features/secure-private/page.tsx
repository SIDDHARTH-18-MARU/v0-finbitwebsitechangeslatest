"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  ArrowLeft,
  Sparkles,
  Lock,
  Eye,
  Database,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Key,
  FileCheck,
} from "lucide-react"
import Link from "next/link"

export default function SecurePrivate() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "AES-256 Encryption",
      description: "Military-grade encryption for all your financial data",
      status: "active",
    },
    {
      icon: Smartphone,
      title: "Biometric Authentication",
      description: "Fingerprint and face unlock for secure access",
      status: "active",
    },
    {
      icon: Database,
      title: "Zero-Knowledge Architecture",
      description: "We can't see your data even if we wanted to",
      status: "active",
    },
    {
      icon: Eye,
      title: "No Data Sharing",
      description: "Your information is never sold or shared with third parties",
      status: "active",
    },
    {
      icon: Key,
      title: "Local Data Processing",
      description: "Most operations happen on your device, not our servers",
      status: "active",
    },
    {
      icon: FileCheck,
      title: "RBI Compliance",
      description: "Fully compliant with Indian banking regulations",
      status: "active",
    },
  ]

  const privacyPrinciples = [
    {
      title: "Data Minimization",
      description: "We only collect the minimum data necessary for the app to function effectively.",
    },
    {
      title: "Purpose Limitation",
      description: "Your data is used only for the specific purposes you've consented to.",
    },
    {
      title: "Transparency",
      description: "Clear information about what data we collect and how it's used.",
    },
    {
      title: "User Control",
      description: "You have full control over your data with options to export or delete.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/#features">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Features
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Secure & Private</h1>
                <p className="text-muted-foreground">Bank-grade security with complete privacy protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Our Security & Privacy Commitment</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your financial data is protected with AES-256 encryption, biometric authentication, and
                    zero-knowledge architecture. We store minimal data locally on your device and never share personal
                    information with third parties. Our security measures meet and exceed banking industry standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Status Dashboard */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Security Status</h2>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  All Systems Secure
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Encryption & Security */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Encryption & Security</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-600">Data Encryption</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                      All your financial data is encrypted using AES-256 encryption, the same standard used by banks and
                      government agencies.
                    </p>
                    <div className="text-xs font-mono bg-blue-100 dark:bg-blue-900/40 p-2 rounded border">
                      🔒 AES-256-GCM • RSA-4096 • PBKDF2 • SHA-256
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-600">Biometric Security</span>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Access your app using fingerprint, face recognition, or device PIN. Biometric data never leaves
                      your device.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-600">Local Storage</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your transaction data is stored locally on your device. We only sync encrypted metadata for backup
                      purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Principles */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Privacy Principles</h2>
                <div className="space-y-4">
                  {privacyPrinciples.map((principle, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                      <h3 className="font-semibold mb-2">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance & Certifications */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Compliance & Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg border">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileCheck className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">RBI Compliant</h3>
                  <p className="text-sm text-muted-foreground">Follows Reserve Bank of India guidelines</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg border">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">ISO 27001</h3>
                  <p className="text-sm text-muted-foreground">Information security management certified</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg border">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">SOC 2 Type II</h3>
                  <p className="text-sm text-muted-foreground">Security and availability audited</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg border">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">GDPR Ready</h3>
                  <p className="text-sm text-muted-foreground">European privacy regulation compliant</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Best Practices */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Security Best Practices for Users</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 text-green-600">✅ Recommended</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Enable biometric authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Use fingerprint or face unlock for quick, secure access
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Keep your app updated</div>
                        <div className="text-sm text-muted-foreground">
                          Regular updates include security patches and improvements
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Use a strong device lock</div>
                        <div className="text-sm text-muted-foreground">
                          Secure your phone with a strong PIN, pattern, or password
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Review permissions regularly</div>
                        <div className="text-sm text-muted-foreground">
                          Check what data the app can access in your device settings
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-red-600">⚠️ Avoid</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Don't use public WiFi for banking</div>
                        <div className="text-sm text-muted-foreground">
                          Avoid accessing financial apps on unsecured networks
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Don't share your device</div>
                        <div className="text-sm text-muted-foreground">
                          Keep your phone private to protect your financial data
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Don't ignore security alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Take action on any security notifications from the app
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Don't use rooted/jailbroken devices</div>
                        <div className="text-sm text-muted-foreground">
                          Modified devices may compromise security features
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
