"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, ArrowLeft, Sparkles, MessageSquare, Wifi, WifiOff, CheckCircle, Brain, Zap } from "lucide-react"
import Link from "next/link"

export default function OfflineSMSParsing() {
  const [smsMessages] = useState([
    {
      id: 1,
      message: "Rs.450 debited from A/c XX1234 at ZOMATO on 15-Jan-24. Avl Bal: Rs.12,550",
      parsed: {
        amount: 450,
        merchant: "ZOMATO",
        category: "Food & Dining",
        date: "15-Jan-24",
        balance: 12550,
      },
      status: "processed",
    },
    {
      id: 2,
      message: "Rs.120 debited from A/c XX1234 for UPI/UBER/123456 on 14-Jan-24. Avl Bal: Rs.13,000",
      parsed: {
        amount: 120,
        merchant: "UBER",
        category: "Transportation",
        date: "14-Jan-24",
        balance: 13000,
      },
      status: "processed",
    },
    {
      id: 3,
      message: "Rs.899 debited from A/c XX1234 at AMAZON PAY on 13-Jan-24. Avl Bal: Rs.13,120",
      parsed: {
        amount: 899,
        merchant: "AMAZON PAY",
        category: "Shopping",
        date: "13-Jan-24",
        balance: 13120,
      },
      status: "processed",
    },
    {
      id: 4,
      message: "Rs.280 debited from A/c XX1234 at STARBUCKS COFFEE on 12-Jan-24. Avl Bal: Rs.14,019",
      parsed: {
        amount: 280,
        merchant: "STARBUCKS COFFEE",
        category: "Food & Dining",
        date: "12-Jan-24",
        balance: 14019,
      },
      status: "processed",
    },
  ])

  const [isOfflineMode, setIsOfflineMode] = useState(false)

  const totalTransactions = smsMessages.length
  const totalAmount = smsMessages.reduce((sum, sms) => sum + sms.parsed.amount, 0)
  const categoriesCount = new Set(smsMessages.map((sms) => sms.parsed.category)).size

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
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Offline SMS Parsing</h1>
                <p className="text-muted-foreground">Track expenses from SMS without internet</p>
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
                  <h2 className="text-xl font-semibold mb-2">How Offline SMS Parsing Works</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our advanced SMS parsing technology works completely offline, analyzing bank SMS notifications to
                    automatically categorize and track your expenses. No internet connection required! The app processes
                    SMS messages locally on your device using pattern recognition and machine learning.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connection Status */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Connection Status</h2>
                <Button
                  variant="outline"
                  onClick={() => setIsOfflineMode(!isOfflineMode)}
                  className="flex items-center gap-2"
                >
                  {isOfflineMode ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                  {isOfflineMode ? "Offline Mode" : "Online Mode"}
                </Button>
              </div>
              <div
                className={`p-4 rounded-lg border ${
                  isOfflineMode
                    ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
                    : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isOfflineMode ? (
                    <WifiOff className="w-5 h-5 text-orange-600" />
                  ) : (
                    <Wifi className="w-5 h-5 text-green-600" />
                  )}
                  <span className={`font-semibold ${isOfflineMode ? "text-orange-600" : "text-green-600"}`}>
                    {isOfflineMode ? "Working Offline" : "Connected to Internet"}
                  </span>
                </div>
                <p
                  className={`text-sm ${isOfflineMode ? "text-orange-700 dark:text-orange-300" : "text-green-700 dark:text-green-300"}`}
                >
                  {isOfflineMode
                    ? "SMS parsing is working offline. All transactions are being processed locally on your device."
                    : "SMS parsing is working online with cloud sync enabled for backup and analytics."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">{totalTransactions}</div>
                <div className="text-muted-foreground">SMS Processed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</div>
                <div className="text-muted-foreground">Total Tracked</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">{categoriesCount}</div>
                <div className="text-muted-foreground">Categories Found</div>
              </CardContent>
            </Card>
          </div>

          {/* SMS Processing Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Raw SMS Messages */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Raw SMS Messages</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {smsMessages.map((sms) => (
                    <div key={sms.id} className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          Bank SMS
                        </Badge>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-sm font-mono bg-muted/50 p-3 rounded border text-muted-foreground">
                        {sms.message}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Parsed Data */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Parsed Transactions</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {smsMessages.map((sms) => (
                    <div key={sms.id} className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-lg">{sms.parsed.merchant}</div>
                        <Badge variant="outline" className="text-primary">
                          {sms.parsed.category}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <div className="font-semibold">₹{sms.parsed.amount}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date:</span>
                          <div className="font-semibold">{sms.parsed.date}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Balance:</span>
                          <div className="font-semibold">₹{sms.parsed.balance.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="font-semibold text-green-600">Processed</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How SMS Parsing Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. SMS Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    App automatically detects bank SMS notifications in the background
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Pattern Recognition</h3>
                  <p className="text-sm text-muted-foreground">
                    AI extracts amount, merchant, date, and account details from SMS text
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Auto Categorization</h3>
                  <p className="text-sm text-muted-foreground">
                    Merchant names are automatically categorized into spending categories
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">4. Local Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    All data is processed and stored locally on your device for privacy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supported Banks */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Supported Banks & Formats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Major Banks Supported</h3>
                  <div className="space-y-2">
                    {[
                      "State Bank of India (SBI)",
                      "HDFC Bank",
                      "ICICI Bank",
                      "Axis Bank",
                      "Kotak Mahindra Bank",
                      "Punjab National Bank",
                      "Bank of Baroda",
                      "Canara Bank",
                    ].map((bank, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{bank}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">SMS Format Examples</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded border">
                      <div className="text-xs text-muted-foreground mb-1">Debit Transaction</div>
                      <div className="text-sm font-mono">Rs.XXX debited from A/c XXXX at MERCHANT</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded border">
                      <div className="text-xs text-muted-foreground mb-1">UPI Transaction</div>
                      <div className="text-sm font-mono">Rs.XXX debited for UPI/MERCHANT/XXXX</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded border">
                      <div className="text-xs text-muted-foreground mb-1">Card Transaction</div>
                      <div className="text-sm font-mono">Rs.XXX spent on Card XXXX at MERCHANT</div>
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
