"use client"

import type React from "react"
import Link from "next/link"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import {
  Smartphone,
  Brain,
  Bell,
  Gamepad2,
  Shield,
  TrendingUp,
  ScanLine,
  Camera,
  Award,
  Plus,
  CheckCircle,
  Trophy,
  Star,
  Upload,
  Send,
  Mail,
  Phone,
  User,
  Receipt,
  FileImage,
  ArrowRight,
  Sparkles,
  Zap,
  Wifi,
} from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Offline SMS Parsing",
    description: "Automatically track expenses from SMS notifications even without internet connection.",
    details:
      "Our advanced SMS parsing technology works completely offline, analyzing bank SMS notifications to automatically categorize and track your expenses. No internet required!",
    demo: "Example: 'Rs.450 debited from A/c XX1234 at ZOMATO on 15-Jan' → Automatically categorized as 'Food & Dining'",
  },
  {
    icon: Brain,
    title: "AI Categorization",
    description: "Smart AI automatically categorizes your expenses for better budget insights.",
    details:
      "Our AI engine learns from your spending patterns and automatically categorizes transactions with 95% accuracy. It recognizes merchant names, transaction patterns, and spending contexts.",
    demo: "Categories: Food & Dining, Transportation, Entertainment, Shopping, Bills & Utilities, Healthcare, Education",
  },
  {
    icon: ScanLine,
    title: "Bill Scanning & Splitting",
    description: "Scan receipts with your camera and instantly split bills with friends and roommates.",
    details:
      "Use your phone's camera to scan any receipt or bill. Our OCR technology extracts all items and amounts, then easily split costs among friends with automatic calculation and payment tracking.",
    demo: "Scan → Extract items → Select friends → Calculate splits → Send payment requests",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Never miss bill payments with personalized reminders and notifications.",
    details:
      "AI-powered reminders that learn your payment patterns and send notifications at optimal times. Set custom reminders for recurring bills, EMIs, and subscription payments.",
    demo: "Electricity bill due in 3 days • Credit card payment due tomorrow • Netflix subscription renewing next week",
  },
  {
    icon: Gamepad2,
    title: "Gamified Savings",
    description: "Achieve financial goals through engaging challenges and reward systems.",
    details:
      "Turn saving money into a fun game! Set savings goals, complete daily challenges, earn points and badges, and compete with friends. Make financial discipline enjoyable and rewarding.",
    demo: "Challenge: Save ₹100 this week • Progress: 60% • Reward: 50 points • Next badge: Super Saver",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-grade security with minimal data storage and complete privacy protection.",
    details:
      "Your financial data is protected with AES-256 encryption, biometric authentication, and zero-knowledge architecture. We store minimal data and never share personal information.",
    demo: "🔒 Encrypted • 🔐 Biometric lock • 🛡️ Zero data sharing • ✅ RBI compliant",
  },
]

const savingsGoal = 5000

export function FeaturesSection() {
  const [aiCategories, setAiCategories] = useState([
    { merchant: "ZOMATO", amount: 450, category: "Food & Dining", confidence: 98, date: "2024-01-15" },
    { merchant: "UBER", amount: 120, category: "Transportation", confidence: 95, date: "2024-01-14" },
    { merchant: "AMAZON", amount: 899, category: "Shopping", confidence: 92, date: "2024-01-13" },
    { merchant: "STARBUCKS", amount: 280, category: "Food & Dining", confidence: 97, date: "2024-01-12" },
    { merchant: "METRO", amount: 45, category: "Transportation", confidence: 94, date: "2024-01-11" },
  ])

  const [billItems, setBillItems] = useState([
    { name: "Pizza Margherita", price: 299, selected: true, quantity: 1 },
    { name: "Garlic Bread", price: 149, selected: true, quantity: 2 },
    { name: "Coke (2L)", price: 80, selected: false, quantity: 1 },
    { name: "French Fries", price: 120, selected: true, quantity: 1 },
  ])

  const [friends, setFriends] = useState([
    { name: "Rahul", email: "rahul@email.com", phone: "+91 98765 43210", selected: true },
    { name: "Priya", email: "priya@email.com", phone: "+91 87654 32109", selected: true },
    { name: "Amit", email: "amit@email.com", phone: "+91 76543 21098", selected: false },
  ])

  const [numberOfPeople, setNumberOfPeople] = useState(3)
  const [newTransaction, setNewTransaction] = useState({ merchant: "", amount: "", category: "" })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [invoicesSent, setInvoicesSent] = useState(false)
  const [currentSavings, setCurrentSavings] = useState(3200)
  const [points, setPoints] = useState(1250)

  const selectedFriends = friends.filter((f) => f.selected)
  const selectedItems = billItems.filter((item) => item.selected)
  const totalBill = selectedItems.reduce((sum, item) => sum + item.price, 0)
  const splitAmount = selectedFriends.length > 0 ? totalBill / (selectedFriends.length + 1) : totalBill

  const savingsProgress = (currentSavings / savingsGoal) * 100

  const addManualTransaction = () => {
    if (newTransaction.merchant && newTransaction.amount && newTransaction.category) {
      const transaction = {
        merchant: newTransaction.merchant.toUpperCase(),
        amount: Number.parseInt(newTransaction.amount),
        category: newTransaction.category,
        confidence: Math.floor(Math.random() * 10) + 90,
        date: new Date().toISOString().split("T")[0],
      }
      setAiCategories([transaction, ...aiCategories.slice(0, 4)])
      setNewTransaction({ merchant: "", amount: "", category: "" })
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        // Simulate OCR processing after image upload
        setTimeout(() => {
          simulateOCR()
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

  const simulateOCR = () => {
    const ocrItems = [
      { name: "Chicken Biryani", price: 350, selected: true, quantity: 2 },
      { name: "Raita", price: 80, selected: true, quantity: 1 },
      { name: "Gulab Jamun", price: 120, selected: true, quantity: 1 },
      { name: "Lassi", price: 60, selected: false, quantity: 2 },
    ]
    setBillItems(ocrItems)
  }

  const generateInvoices = () => {
    setInvoicesSent(true)
    setTimeout(() => setInvoicesSent(false), 3000)
  }

  const expenseData = [
    { name: "Food & Dining", value: 730, color: "#8884d8" },
    { name: "Transportation", value: 165, color: "#82ca9d" },
    { name: "Shopping", value: 899, color: "#ffc658" },
    { name: "Entertainment", value: 200, color: "#ff7300" },
    { name: "Bills", value: 450, color: "#00ff88" },
  ]

  const spendingTrends = [
    { month: "Oct", amount: 2100 },
    { month: "Nov", amount: 2400 },
    { month: "Dec", amount: 2200 },
    { month: "Jan", amount: 2444 },
  ]

  return (
    <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Interactive Demos Available
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance mb-3 sm:mb-4 leading-tight">
            Everything you need for
            <br />
            <span className="text-primary">smart money management</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-2xl mx-auto px-2">
            Built specifically for students, hostel residents, and young professionals who want to take control of their
            finances without breaking the bank.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const getFeatureLink = (title: string) => {
              switch (title) {
                case "AI Categorization":
                  return "/features/ai-categorization"
                case "Bill Scanning & Splitting":
                  return "/features/bill-scanning"
                case "Gamified Savings":
                  return "/features/gamified-savings"
                case "Smart Reminders":
                  return "/features/smart-reminders"
                case "Offline SMS Parsing":
                  return "/features/offline-sms"
                case "Secure & Private":
                  return "/features/secure-private"
                default:
                  return null
              }
            }

            const featureLink = getFeatureLink(feature.title)

            if (featureLink) {
              return (
                <Link key={index} href={featureLink}>
                  <Card className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] group bg-card/50 backdrop-blur-sm h-full">
                    <CardContent className="p-4 sm:p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Try Interactive Demo
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            }

            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] group bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Try Interactive Demo
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] w-full h-[95vh] max-h-[95vh] overflow-hidden p-0">
                  <div className="flex flex-col h-full">
                    <DialogHeader className="px-6 sm:px-8 py-4 sm:py-6 border-b bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-3 sm:gap-4 text-xl sm:text-2xl">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                            <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-bold">{feature.title}</div>
                            <div className="text-sm text-muted-foreground font-normal mt-1">Interactive Demo</div>
                          </div>
                        </DialogTitle>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4 leading-relaxed px-2">
                        {feature.details}
                      </p>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6">
                      {feature.title === "AI Categorization" && (
                        <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
                          <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-4 sm:p-6 border border-border/50">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <h3 className="text-lg sm:text-xl font-semibold">Add New Transaction</h3>
                              <Badge variant="secondary">
                                <Brain className="w-3 h-3 mr-1" />
                                AI Powered
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                              <Input
                                placeholder="Merchant name (e.g., ZOMATO, UBER)"
                                value={newTransaction.merchant}
                                onChange={(e) => setNewTransaction({ ...newTransaction, merchant: e.target.value })}
                                className="h-11 sm:h-12"
                              />
                              <Input
                                placeholder="Amount (₹)"
                                type="number"
                                value={newTransaction.amount}
                                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                                className="h-11 sm:h-12"
                              />
                              <select
                                className="px-3 sm:px-4 py-2 sm:py-3 border rounded-md h-11 sm:h-12 bg-background"
                                value={newTransaction.category}
                                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                              >
                                <option value="">Select category</option>
                                <option value="Food & Dining">Food & Dining</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Bills">Bills</option>
                              </select>
                            </div>
                            <Button size="lg" onClick={addManualTransaction} className="w-full">
                              <Plus className="w-5 h-5 mr-2" />
                              Add Transaction & Categorize
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                            <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-4 sm:p-6 border border-border/50">
                              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Recent Transactions</h3>
                              <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
                                {aiCategories.map((transaction, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 sm:p-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm border border-border/30"
                                  >
                                    <div>
                                      <div className="font-semibold text-base sm:text-lg">{transaction.merchant}</div>
                                      <div className="text-sm text-muted-foreground">
                                        ₹{transaction.amount} • {transaction.date}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-semibold text-primary text-sm sm:text-base">
                                        {transaction.category}
                                      </div>
                                      <div className="text-xs sm:text-sm text-muted-foreground">
                                        {transaction.confidence}% confidence
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-4 sm:p-6 border border-border/50">
                                <h3 className="text-lg sm:text-xl font-semibold mb-4">Expense Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                  <PieChart>
                                    <Pie
                                      data={expenseData}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={100}
                                      fill="#8884d8"
                                      dataKey="value"
                                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                      {expenseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>

                              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-4 sm:p-6 border border-border/50">
                                <h3 className="text-lg sm:text-xl font-semibold mb-4">Spending Trends</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                  <LineChart data={spendingTrends}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`₹${value}`, "Spent"]} />
                                    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={3} />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {feature.title === "Bill Scanning & Splitting" && (
                        <div className="space-y-8 max-w-6xl mx-auto">
                          <div className="bg-muted/50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-6">Upload Receipt</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center">
                                  {!uploadedImage ? (
                                    <div>
                                      <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                      <p className="text-muted-foreground mb-4 text-lg">
                                        Upload receipt image (JPG, PNG, PDF)
                                      </p>
                                      <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="receipt-upload"
                                      />
                                      <label htmlFor="receipt-upload">
                                        <Button asChild className="cursor-pointer">
                                          <span>
                                            <Camera className="w-4 h-4 mr-2" />
                                            Choose File
                                          </span>
                                        </Button>
                                      </label>
                                      <p className="text-sm text-muted-foreground mt-2">
                                        Or try our demo with sample receipt
                                      </p>
                                      <Button variant="outline" onClick={simulateOCR} className="mt-2 bg-transparent">
                                        <Receipt className="w-4 h-4 mr-2" />
                                        Demo OCR Scan
                                      </Button>
                                    </div>
                                  ) : (
                                    <div>
                                      <Receipt className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                      <p className="text-green-600 font-semibold text-lg">
                                        Receipt scanned successfully!
                                      </p>
                                      <p className="text-sm text-muted-foreground mt-2">
                                        {uploadedFile ? `File: ${uploadedFile.name}` : "Demo receipt processed"}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {uploadedImage && (
                                <div className="bg-background rounded-xl p-4">
                                  <h4 className="font-semibold mb-3">Receipt Preview</h4>
                                  <div className="border rounded-lg overflow-hidden">
                                    {uploadedFile?.type === "application/pdf" ? (
                                      <div className="p-8 text-center bg-muted/30">
                                        <FileImage className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-muted-foreground">PDF Receipt Uploaded</p>
                                        <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                                      </div>
                                    ) : (
                                      <img
                                        src={uploadedImage || "/placeholder.svg"}
                                        alt="Receipt preview"
                                        className="w-full h-64 object-contain bg-muted/30"
                                      />
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-muted/50 rounded-xl p-6">
                              <h3 className="text-xl font-semibold mb-6">Extracted Items</h3>
                              <div className="space-y-3">
                                {billItems.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-4 bg-background rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={item.selected}
                                        onChange={(e) => {
                                          const newItems = [...billItems]
                                          newItems[idx].selected = e.target.checked
                                          setBillItems(newItems)
                                        }}
                                        className="rounded w-4 h-4"
                                      />
                                      <div>
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
                                      </div>
                                    </div>
                                    <span className="font-semibold text-lg">₹{item.price}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                                <div className="text-lg font-semibold">Selected Total: ₹{totalBill}</div>
                              </div>
                            </div>

                            <div className="bg-muted/50 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold">Split Bill</h3>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">People:</span>
                                  <Input
                                    type="number"
                                    value={numberOfPeople}
                                    onChange={(e) => setNumberOfPeople(Number.parseInt(e.target.value) || 1)}
                                    className="w-20"
                                    min="1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-4 mb-6">
                                {friends.slice(0, numberOfPeople - 1).map((friend, idx) => (
                                  <div key={idx} className="p-4 bg-background rounded-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                      <input
                                        type="checkbox"
                                        checked={friend.selected}
                                        onChange={(e) => {
                                          const newFriends = [...friends]
                                          newFriends[idx].selected = e.target.checked
                                          setFriends(newFriends)
                                        }}
                                        className="rounded w-4 h-4"
                                      />
                                      <User className="w-5 h-5" />
                                      <span className="font-semibold">{friend.name}</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground ml-8">
                                      <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {friend.email}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {friend.phone}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="p-6 bg-primary/10 rounded-lg">
                                <div className="space-y-2 mb-4">
                                  <div className="flex justify-between text-lg">
                                    <span>Total Bill:</span>
                                    <span className="font-semibold">₹{totalBill}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Split between:</span>
                                    <span>{selectedFriends.length + 1} people</span>
                                  </div>
                                  <div className="flex justify-between text-xl font-bold text-primary">
                                    <span>Each pays:</span>
                                    <span>₹{splitAmount.toFixed(2)}</span>
                                  </div>
                                </div>

                                <Button
                                  size="lg"
                                  className="w-full"
                                  onClick={generateInvoices}
                                  disabled={selectedFriends.length === 0}
                                >
                                  <Send className="w-5 h-5 mr-2" />
                                  {invoicesSent ? "Invoices Sent!" : "Generate & Send Invoices"}
                                </Button>

                                {invoicesSent && (
                                  <div className="mt-4 text-center">
                                    <div className="text-green-600 font-semibold">
                                      ✅ Payment requests sent to {selectedFriends.length} friends
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      They will receive SMS and email notifications with payment links
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {feature.title === "Gamified Savings" && (
                        <div className="space-y-8 max-w-4xl mx-auto">
                          <div className="bg-muted/50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-semibold">Savings Dashboard</h3>
                              <div className="flex items-center gap-3">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                <span className="text-lg font-semibold">{points} points</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                <div className="p-6 bg-background rounded-xl">
                                  <div className="flex justify-between text-lg mb-3">
                                    <span>Monthly Goal</span>
                                    <span className="font-semibold">
                                      ₹{currentSavings} / ₹{savingsGoal}
                                    </span>
                                  </div>
                                  <Progress value={savingsProgress} className="h-3 mb-2" />
                                  <div className="text-sm text-muted-foreground">
                                    {savingsProgress.toFixed(1)}% complete • ₹{savingsGoal - currentSavings} remaining
                                  </div>
                                </div>

                                <div className="p-6 bg-background rounded-xl">
                                  <h4 className="font-semibold mb-4">Daily Challenge</h4>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Skip one coffee today</div>
                                      <div className="text-sm text-muted-foreground">Save ₹100 • Earn 50 points</div>
                                    </div>
                                    <Button
                                      onClick={() => {
                                        setCurrentSavings(currentSavings + 100)
                                        setPoints(points + 50)
                                      }}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Complete
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-6">
                                <div className="p-6 bg-background rounded-xl">
                                  <h4 className="font-semibold mb-4">Achievement Badges</h4>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                                      <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                      <div className="text-sm font-medium">Saver</div>
                                      <div className="text-xs text-green-600">Earned</div>
                                    </div>
                                    <div className="text-center p-3 bg-muted/50 rounded-lg opacity-60">
                                      <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                      <div className="text-sm font-medium">Super Saver</div>
                                      <div className="text-xs text-muted-foreground">₹500 more</div>
                                    </div>
                                    <div className="text-center p-3 bg-muted/50 rounded-lg opacity-60">
                                      <Trophy className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                      <div className="text-sm font-medium">Money Master</div>
                                      <div className="text-xs text-muted-foreground">₹2000 more</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-6 bg-background rounded-xl">
                                  <h4 className="font-semibold mb-4">Weekly Challenges</h4>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                      <div>
                                        <div className="font-medium">Cook at home 5 times</div>
                                        <div className="text-sm text-muted-foreground">3/5 completed</div>
                                      </div>
                                      <div className="text-sm font-medium text-primary">200 pts</div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                      <div>
                                        <div className="font-medium">Use public transport</div>
                                        <div className="text-sm text-muted-foreground">Save on cab fares</div>
                                      </div>
                                      <div className="text-sm font-medium text-primary">150 pts</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {feature.title === "Smart Reminders" && (
                        <div className="space-y-8 max-w-4xl mx-auto">
                          <div className="bg-muted/50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-6">Smart Reminders Demo</h3>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center">
                              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground mb-4 text-lg">Set reminders for bill payments</p>
                              <Button variant="outline" className="bg-transparent">
                                <Bell className="w-4 h-4 mr-2" />
                                Demo Reminders
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {feature.title === "Offline SMS Parsing" && (
                        <div className="space-y-8 max-w-4xl mx-auto">
                          <div className="bg-muted/50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-6">SMS Parsing Demo</h3>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center">
                              <Smartphone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground mb-4 text-lg">Parse SMS without internet</p>
                              <Button variant="outline" className="bg-transparent">
                                <Smartphone className="w-4 h-4 mr-2" />
                                Demo SMS Parsing
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {feature.title === "Secure & Private" && (
                        <div className="space-y-8 max-w-4xl mx-auto">
                          <div className="bg-muted/50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-6">Security Features Demo</h3>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center">
                              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground mb-4 text-lg">Ensure your financial data is secure</p>
                              <Button variant="outline" className="bg-transparent">
                                <Shield className="w-4 h-4 mr-2" />
                                Demo Security
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8 border border-primary/10">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-base sm:text-lg">How it works:</h4>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.demo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="lg:col-span-2 border-0 shadow-sm bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Real-time Analytics</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Track spending patterns and budget performance
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground border border-border/30">
                Monthly spending: ₹12,450 • Budget remaining: ₹2,550 • Top category: Food & Dining (₹4,200)
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                  <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Works Offline</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    No internet? No problem. Track expenses anywhere.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
