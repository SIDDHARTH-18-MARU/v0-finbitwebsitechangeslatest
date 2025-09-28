"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bell,
  ArrowLeft,
  Sparkles,
  Plus,
  Calendar,
  Clock,
  CreditCard,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function SmartReminders() {
  const [reminders, setReminders] = useState([
    { id: 1, title: "Electricity Bill", amount: 1200, dueDate: "2024-01-18", status: "upcoming", priority: "high" },
    { id: 2, title: "Credit Card Payment", amount: 5400, dueDate: "2024-01-20", status: "upcoming", priority: "high" },
    {
      id: 3,
      title: "Netflix Subscription",
      amount: 199,
      dueDate: "2024-01-22",
      status: "upcoming",
      priority: "medium",
    },
    { id: 4, title: "Internet Bill", amount: 800, dueDate: "2024-01-25", status: "upcoming", priority: "medium" },
    { id: 5, title: "Mobile Recharge", amount: 399, dueDate: "2024-01-15", status: "overdue", priority: "high" },
  ])

  const [newReminder, setNewReminder] = useState({ title: "", amount: "", dueDate: "", priority: "medium" })

  const addReminder = () => {
    if (newReminder.title && newReminder.amount && newReminder.dueDate) {
      const reminder = {
        id: Date.now(),
        title: newReminder.title,
        amount: Number.parseInt(newReminder.amount),
        dueDate: newReminder.dueDate,
        status: "upcoming",
        priority: newReminder.priority,
      }
      setReminders([reminder, ...reminders])
      setNewReminder({ title: "", amount: "", dueDate: "", priority: "medium" })
    }
  }

  const markAsPaid = (id: number) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, status: "paid" } : r)))
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusColor = (status: string, daysUntil: number) => {
    if (status === "paid") return "text-green-600"
    if (status === "overdue" || daysUntil < 0) return "text-red-600"
    if (daysUntil <= 1) return "text-orange-600"
    return "text-blue-600"
  }

  const getStatusText = (status: string, daysUntil: number) => {
    if (status === "paid") return "Paid"
    if (status === "overdue" || daysUntil < 0) return "Overdue"
    if (daysUntil === 0) return "Due Today"
    if (daysUntil === 1) return "Due Tomorrow"
    return `Due in ${daysUntil} days`
  }

  const upcomingReminders = reminders.filter((r) => r.status !== "paid")
  const totalUpcoming = upcomingReminders.reduce((sum, r) => sum + r.amount, 0)

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
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Smart Reminders</h1>
                <p className="text-muted-foreground">Never miss a payment with AI-powered reminders</p>
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
                  <h2 className="text-xl font-semibold mb-2">How Smart Reminders Work</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    AI-powered reminders that learn your payment patterns and send notifications at optimal times. Set
                    custom reminders for recurring bills, EMIs, and subscription payments. Get notified via SMS, email,
                    and push notifications based on your preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">{upcomingReminders.length}</div>
                <div className="text-muted-foreground">Upcoming Bills</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CreditCard className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">₹{totalUpcoming.toLocaleString()}</div>
                <div className="text-muted-foreground">Total Amount Due</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">{reminders.filter((r) => r.status === "paid").length}</div>
                <div className="text-muted-foreground">Paid This Month</div>
              </CardContent>
            </Card>
          </div>

          {/* Add New Reminder */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Add New Reminder</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Input
                  placeholder="Bill name (e.g., Electricity Bill)"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="h-12"
                />
                <Input
                  placeholder="Amount (₹)"
                  type="number"
                  value={newReminder.amount}
                  onChange={(e) => setNewReminder({ ...newReminder, amount: e.target.value })}
                  className="h-12"
                />
                <Input
                  type="date"
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                  className="h-12"
                />
                <select
                  className="px-4 py-3 border rounded-md h-12 bg-background"
                  value={newReminder.priority}
                  onChange={(e) => setNewReminder({ ...newReminder, priority: e.target.value })}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <Button size="lg" onClick={addReminder} className="w-full">
                <Plus className="w-5 h-5 mr-2" />
                Add Reminder
              </Button>
            </CardContent>
          </Card>

          {/* Reminders List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming & Overdue */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Upcoming & Overdue</h2>
                <div className="space-y-4">
                  {upcomingReminders.map((reminder) => {
                    const daysUntil = getDaysUntilDue(reminder.dueDate)
                    return (
                      <div
                        key={reminder.id}
                        className="p-4 bg-muted/30 rounded-lg border flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              reminder.priority === "high"
                                ? "bg-red-500"
                                : reminder.priority === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div>
                            <div className="font-semibold">{reminder.title}</div>
                            <div className="text-sm text-muted-foreground">
                              ₹{reminder.amount.toLocaleString()} • {reminder.dueDate}
                            </div>
                            <div className={`text-sm font-medium ${getStatusColor(reminder.status, daysUntil)}`}>
                              {getStatusText(reminder.status, daysUntil)}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => markAsPaid(reminder.id)} className="ml-4">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Paid
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Smart Insights */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Smart Insights</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-600">Payment Pattern</span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        You typically pay bills 2-3 days before due date. We'll remind you on Jan 15th for your
                        electricity bill.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-600">Budget Impact</span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your upcoming bills total ₹7,998. This is 15% less than last month's bills.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold text-orange-600">Optimal Timing</span>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Best time to pay your credit card: Jan 18th (2 days before due) to avoid late fees.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">Get SMS alerts for due bills</div>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                      <div>
                        <div className="font-medium">Email Reminders</div>
                        <div className="text-sm text-muted-foreground">Daily email digest of upcoming bills</div>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">In-app notifications</div>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                      <div>
                        <div className="font-medium">Smart Timing</div>
                        <div className="text-sm text-muted-foreground">AI-optimized reminder timing</div>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
