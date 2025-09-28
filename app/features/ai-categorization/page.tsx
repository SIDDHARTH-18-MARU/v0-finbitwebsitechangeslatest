"use client"

import { useState, useEffect, useCallback } from "react"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts"
import {
  Brain,
  Plus,
  TrendingUp,
  PieChartIcon,
  BarChart3,
  Download,
  Search,
  DollarSign,
  ShoppingBag,
  Car,
  Coffee,
  Home,
  Gamepad2,
  Heart,
  GraduationCap,
  Smartphone,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: string
  merchant: string
  amount: number
  category: string
  confidence: number
  date: string
  description?: string
  isManual?: boolean
}

interface CategoryData {
  name: string
  value: number
  color: string
  icon: any
  transactions: number
}

const categoryIcons = {
  "Food & Dining": Coffee,
  Transportation: Car,
  Shopping: ShoppingBag,
  Entertainment: Gamepad2,
  "Bills & Utilities": Home,
  Healthcare: Heart,
  Education: GraduationCap,
  Technology: Smartphone,
  Others: DollarSign,
}

const categoryColors = {
  "Food & Dining": "#8884d8",
  Transportation: "#82ca9d",
  Shopping: "#ffc658",
  Entertainment: "#ff7300",
  "Bills & Utilities": "#00ff88",
  Healthcare: "#ff6b6b",
  Education: "#4ecdc4",
  Technology: "#45b7d1",
  Others: "#96ceb4",
}

export default function AICategorization() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      merchant: "ZOMATO",
      amount: 450,
      category: "Food & Dining",
      confidence: 98,
      date: "2024-01-15",
      description: "Dinner order",
    },
    {
      id: "2",
      merchant: "UBER",
      amount: 120,
      category: "Transportation",
      confidence: 95,
      date: "2024-01-14",
      description: "Ride to office",
    },
    {
      id: "3",
      merchant: "AMAZON",
      amount: 899,
      category: "Shopping",
      confidence: 92,
      date: "2024-01-13",
      description: "Electronics purchase",
    },
    {
      id: "4",
      merchant: "STARBUCKS",
      amount: 280,
      category: "Food & Dining",
      confidence: 97,
      date: "2024-01-12",
      description: "Coffee and snacks",
    },
    {
      id: "5",
      merchant: "METRO",
      amount: 45,
      category: "Transportation",
      confidence: 94,
      date: "2024-01-11",
      description: "Metro card recharge",
    },
    {
      id: "6",
      merchant: "NETFLIX",
      amount: 199,
      category: "Entertainment",
      confidence: 99,
      date: "2024-01-10",
      description: "Monthly subscription",
    },
    {
      id: "7",
      merchant: "ELECTRICITY BOARD",
      amount: 850,
      category: "Bills & Utilities",
      confidence: 100,
      date: "2024-01-09",
      description: "Electricity bill",
    },
    {
      id: "8",
      merchant: "APOLLO PHARMACY",
      amount: 320,
      category: "Healthcare",
      confidence: 96,
      date: "2024-01-08",
      description: "Medicines",
    },
  ])

  const [newTransaction, setNewTransaction] = useState({
    merchant: "",
    amount: "",
    category: "",
    description: "",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [dateRange, setDateRange] = useState("30")
  const [isProcessing, setIsProcessing] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calculate category data
  const categoryData: CategoryData[] = Object.keys(categoryColors)
    .map((category) => {
      const categoryTransactions = transactions.filter((t) => t.category === category)
      const totalAmount = categoryTransactions.reduce((sum, t) => sum + t.amount, 0)
      return {
        name: category,
        value: totalAmount,
        color: categoryColors[category as keyof typeof categoryColors],
        icon: categoryIcons[category as keyof typeof categoryIcons],
        transactions: categoryTransactions.length,
      }
    })
    .filter((cat) => cat.value > 0)

  // Calculate spending trends (last 6 months)
  const spendingTrends = [
    { month: "Aug", amount: 2100, transactions: 15 },
    { month: "Sep", amount: 2400, transactions: 18 },
    { month: "Oct", amount: 2200, transactions: 16 },
    { month: "Nov", amount: 2600, transactions: 20 },
    { month: "Dec", amount: 2800, transactions: 22 },
    { month: "Jan", amount: 3163, transactions: transactions.length },
  ]

  // Monthly comparison data
  const monthlyComparison = [
    { category: "Food & Dining", thisMonth: 730, lastMonth: 650 },
    { category: "Transportation", thisMonth: 165, lastMonth: 180 },
    { category: "Shopping", thisMonth: 899, lastMonth: 750 },
    { category: "Entertainment", thisMonth: 199, lastMonth: 220 },
    { category: "Bills & Utilities", thisMonth: 850, lastMonth: 800 },
    { category: "Healthcare", thisMonth: 320, lastMonth: 150 },
  ]

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0)
  const avgConfidence = transactions.reduce((sum, t) => sum + t.confidence, 0) / transactions.length

  const addTransaction = () => {
    if (newTransaction.merchant && newTransaction.amount && newTransaction.category) {
      setIsProcessing(true)

      // Simulate AI processing
      setTimeout(() => {
        const transaction: Transaction = {
          id: Date.now().toString(),
          merchant: newTransaction.merchant.toUpperCase(),
          amount: Number(newTransaction.amount),
          category: newTransaction.category,
          confidence: Math.floor(Math.random() * 10) + 90,
          date: new Date().toISOString().split("T")[0],
          description: newTransaction.description || "Manual entry",
          isManual: true,
        }

        setTransactions([transaction, ...transactions])
        setNewTransaction({ merchant: "", amount: "", category: "", description: "" })
        setIsProcessing(false)
        setLastUpdated(new Date())
      }, 1500)
    }
  }

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
    setEditingTransaction(null)
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const exportToCSV = () => {
    const csvContent = [
      ["Date", "Merchant", "Amount", "Category", "Confidence", "Description"],
      ...transactions.map((t) => [t.date, t.merchant, t.amount, t.category, t.confidence, t.description || ""]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
  }

  const refreshData = useCallback(async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshData()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [refreshData])

  return (
    <main className="min-h-screen bg-background">
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
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Categorization & Visualization</h1>
                <p className="text-muted-foreground">
                  Smart AI automatically categorizes your expenses with 95% accuracy and provides powerful
                  visualizations for better financial insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">AI Accuracy</p>
                  <p className="text-2xl font-bold">{avgConfidence.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{categoryData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">{transactions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Add Transaction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Transaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label htmlFor="merchant">Merchant</Label>
                    <Input
                      id="merchant"
                      placeholder="e.g., ZOMATO, UBER"
                      value={newTransaction.merchant}
                      onChange={(e) => setNewTransaction({ ...newTransaction, merchant: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                    >
                      <option value="" className="bg-background text-foreground">
                        Select category
                      </option>
                      {Object.keys(categoryColors).map((category) => (
                        <option key={category} value={category} className="bg-background text-foreground">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Optional description"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    />
                  </div>
                </div>
                <Button
                  onClick={addTransaction}
                  disabled={
                    !newTransaction.merchant || !newTransaction.amount || !newTransaction.category || isProcessing
                  }
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Transaction
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Expense Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5" />
                    Expense Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Amount",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                          formatter={(value) => [`₹${value}`, "Amount"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Spending Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Spending Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      amount: {
                        label: "Amount",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={spendingTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`₹${value}`, "Spent"]} />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="hsl(var(--chart-1))"
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryData.map((category) => {
                    const IconComponent = category.icon
                    const percentage = ((category.value / totalSpent) * 100).toFixed(1)
                    return (
                      <div key={category.name} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${category.color}20` }}
                          >
                            <IconComponent className="w-5 h-5" style={{ color: category.color }} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">{category.transactions} transactions</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Amount</span>
                            <span className="font-semibold">₹{category.value.toLocaleString()}</span>
                          </div>
                          <Progress value={Number(percentage)} className="h-2" />
                          <div className="text-right text-sm text-muted-foreground">{percentage}% of total</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    className="px-3 py-2 border rounded-md bg-background text-foreground border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All" className="bg-background text-foreground">
                      All Categories
                    </option>
                    {Object.keys(categoryColors).map((category) => (
                      <option key={category} value={category} className="bg-background text-foreground">
                        {category}
                      </option>
                    ))}
                  </select>
                  <Button onClick={exportToCSV} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => {
                    const IconComponent = categoryIcons[transaction.category as keyof typeof categoryIcons]
                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: `${categoryColors[transaction.category as keyof typeof categoryColors]}20`,
                            }}
                          >
                            <IconComponent
                              className="w-6 h-6"
                              style={{ color: categoryColors[transaction.category as keyof typeof categoryColors] }}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">{transaction.merchant}</div>
                            <div className="text-sm text-muted-foreground">{transaction.description}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{transaction.category}</Badge>
                              <div className="flex items-center gap-1">
                                {transaction.confidence >= 95 ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-3 h-3 text-yellow-500" />
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {transaction.confidence}% confidence
                                </span>
                              </div>
                              {transaction.isManual && (
                                <Badge variant="outline" className="text-xs">
                                  Manual
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">₹{transaction.amount}</div>
                          <div className="text-sm text-muted-foreground">{transaction.date}</div>
                          <div className="flex gap-1 mt-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingTransaction(transaction)}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => deleteTransaction(transaction.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            {/* Monthly Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Monthly Comparison
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshData}
                    disabled={isRefreshing}
                    className="ml-auto bg-transparent"
                  >
                    {isRefreshing ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Refresh
                      </>
                    )}
                  </Button>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    thisMonth: {
                      label: "This Month",
                      color: "hsl(var(--accent))",
                    },
                    lastMonth: {
                      label: "Last Month",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="category"
                        tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis
                        tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="thisMonth" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="lastMonth" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">AI Insights</h2>
              <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
                {isRefreshing ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-spin" />
                    Updating Insights...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Refresh Insights
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Last updated: {lastUpdated.toLocaleTimeString()}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Spending Pattern</h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Your food expenses have increased by 12% this month. Consider cooking at home more often to save
                      money.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Good Habit</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      You've reduced transportation costs by 8% by using public transport more frequently.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Budget Alert</h4>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                      Shopping expenses are 20% higher than usual. Review your recent purchases.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Set Budget Limits</h4>
                      <p className="text-sm text-muted-foreground">
                        Create monthly budgets for each category to better control spending.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Track Daily Expenses</h4>
                      <p className="text-sm text-muted-foreground">
                        Add transactions daily for more accurate categorization and insights.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Review Categories</h4>
                      <p className="text-sm text-muted-foreground">
                        Verify AI categorizations to improve accuracy over time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Transaction Dialog */}
        <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            {editingTransaction && (
              <div className="space-y-4">
                <div>
                  <Label>Merchant</Label>
                  <Input
                    value={editingTransaction.merchant}
                    onChange={(e) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        merchant: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={editingTransaction.amount}
                    onChange={(e) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        amount: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    value={editingTransaction.category}
                    onChange={(e) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        category: e.target.value,
                      })
                    }
                  >
                    {Object.keys(categoryColors).map((category) => (
                      <option key={category} value={category} className="bg-background text-foreground">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={editingTransaction.description || ""}
                    onChange={(e) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => updateTransaction(editingTransaction)} className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditingTransaction(null)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </main>
  )
}
