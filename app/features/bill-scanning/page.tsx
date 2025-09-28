"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Camera,
  Upload,
  ScanLine,
  Users,
  Receipt,
  Send,
  User,
  Plus,
  Trash2,
  CheckCircle,
  History,
  Download,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface BillItem {
  id: string
  name: string
  price: number
  quantity: number
  selected: boolean
}

interface Friend {
  id: string
  name: string
  email: string
  phone: string
  selected: boolean
}

interface BillHistory {
  id: string
  date: string
  restaurant: string
  total: number
  friends: string[]
  items: BillItem[]
}

export default function BillScanningPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrProgress, setOcrProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [billItems, setBillItems] = useState<BillItem[]>([])
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Rahul", email: "rahul@email.com", phone: "+91 98765 43210", selected: false },
    { id: "2", name: "Priya", email: "priya@email.com", phone: "+91 87654 32109", selected: false },
    { id: "3", name: "Amit", email: "amit@email.com", phone: "+91 76543 21098", selected: false },
  ])

  const [newFriend, setNewFriend] = useState({ name: "", email: "", phone: "" })
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [invoicesSent, setInvoicesSent] = useState(false)
  const [billHistory, setBillHistory] = useState<BillHistory[]>([
    {
      id: "1",
      date: "2024-01-15",
      restaurant: "Pizza Palace",
      total: 850,
      friends: ["Rahul", "Priya"],
      items: [
        { id: "1", name: "Pizza Margherita", price: 299, quantity: 1, selected: true },
        { id: "2", name: "Garlic Bread", price: 149, quantity: 2, selected: true },
      ],
    },
  ])

  const selectedFriends = friends.filter((f) => f.selected)
  const selectedItems = billItems.filter((item) => item.selected)
  const totalBill = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const splitAmount = selectedFriends.length > 0 ? totalBill / (selectedFriends.length + 1) : totalBill

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const handleEmailChange = (email: string) => {
    setNewFriend({ ...newFriend, email })
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handlePhoneChange = (phone: string) => {
    setNewFriend({ ...newFriend, phone })
    if (phone && !validatePhone(phone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number")
    } else {
      setPhoneError("")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setBillItems([])
        setIsProcessing(false)
        setOcrProgress(0)
        console.log("[v0] Cleared previous bill items, starting fresh OCR process")
        processOCR()
      }
      reader.readAsDataURL(file)
    }
  }

  const processOCR = () => {
    setIsProcessing(true)
    setOcrProgress(0)
    setCurrentStep(2)
    setBillItems([])
    console.log("[v0] Starting OCR process with clean state")

    // Simulate OCR processing with progress
    const interval = setInterval(() => {
      setOcrProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setTimeout(() => {
            simulateOCRResults()
            setCurrentStep(3)
          }, 100)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const simulateOCRResults = () => {
    console.log("[v0] Generating fresh OCR results")
    const itemTemplates = [
      { name: "Chicken Biryani", price: 350 },
      { name: "Mutton Curry", price: 280 },
      { name: "Paneer Butter Masala", price: 240 },
      { name: "Dal Tadka", price: 180 },
      { name: "Naan", price: 60 },
      { name: "Roti", price: 40 },
      { name: "Raita", price: 80 },
      { name: "Lassi", price: 70 },
      { name: "Gulab Jamun", price: 120 },
      { name: "Ice Cream", price: 90 },
      { name: "Masala Dosa", price: 150 },
      { name: "Idli Sambar", price: 120 },
      { name: "Vada Pav", price: 50 },
      { name: "Pav Bhaji", price: 140 },
      { name: "Butter Chicken", price: 320 },
      { name: "Fish Curry", price: 290 },
      { name: "Samosa", price: 30 },
      { name: "Chole Bhature", price: 160 },
      { name: "Rajma Rice", price: 180 },
      { name: "Aloo Paratha", price: 90 },
    ]

    const timestamp = Date.now()
    const numItems = Math.floor(Math.random() * 4) + 4 // 4-7 items
    const shuffled = [...itemTemplates].sort(() => Math.sin(timestamp + Math.random()) - 0.5)
    const selectedTemplates = shuffled.slice(0, numItems)

    const ocrItems: BillItem[] = selectedTemplates.map((template, index) => ({
      id: `${timestamp}-${index}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID with timestamp
      name: template.name,
      price: template.price + Math.floor(Math.random() * 50) - 25, // Add price variation
      quantity: Math.floor(Math.random() * 3) + 1,
      selected: Math.random() > 0.3, // 70% chance of being selected
    }))

    console.log("[v0] Generated fresh items:", ocrItems.length, "items")
    setBillItems(ocrItems)
  }

  const addFriend = () => {
    const isEmailValid = validateEmail(newFriend.email)
    const isPhoneValid = validatePhone(newFriend.phone)

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address")
    }
    if (!isPhoneValid) {
      setPhoneError("Please enter a valid 10-digit Indian phone number")
    }

    if (newFriend.name && newFriend.email && newFriend.phone && isEmailValid && isPhoneValid) {
      const friend: Friend = {
        id: Date.now().toString(),
        ...newFriend,
        selected: false,
      }
      setFriends([...friends, friend])
      setNewFriend({ name: "", email: "", phone: "" })
      setEmailError("")
      setPhoneError("")
      setShowAddFriend(false)
    }
  }

  const removeFriend = (id: string) => {
    setFriends(friends.filter((f) => f.id !== id))
  }

  const updateItemQuantity = (id: string, quantity: number) => {
    setBillItems(billItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)))
  }

  const updateItemPrice = (id: string, price: number) => {
    setBillItems(billItems.map((item) => (item.id === id ? { ...item, price: Math.max(0, price) } : item)))
  }

  const generateInvoices = () => {
    setInvoicesSent(true)

    // Add to history
    const newBill: BillHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      restaurant: "Restaurant Name",
      total: totalBill,
      friends: selectedFriends.map((f) => f.name),
      items: selectedItems,
    }
    setBillHistory([newBill, ...billHistory])

    setTimeout(() => {
      setInvoicesSent(false)
      setCurrentStep(5)
    }, 3000)
  }

  const resetProcess = () => {
    setCurrentStep(1)
    setUploadedImage(null)
    setUploadedFile(null)
    setBillItems([])
    setFriends(friends.map((f) => ({ ...f, selected: false })))
    setInvoicesSent(false)
    setIsProcessing(false)
    setOcrProgress(0)
    console.log("[v0] Process reset complete")
  }

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
                <ScanLine className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Bill Scanning & Splitting</h1>
                <p className="text-muted-foreground">
                  Scan any receipt with your camera, extract items automatically, and split bills with friends
                  instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
            {[
              { step: 1, title: "Upload", icon: Upload },
              { step: 2, title: "Process", icon: ScanLine },
              { step: 3, title: "Review", icon: Receipt },
              { step: 4, title: "Split", icon: Users },
              { step: 5, title: "Send", icon: Send },
            ].map(({ step, title, icon: Icon }, index) => (
              <div key={step} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium mt-1 sm:mt-2">{title}</span>
                </div>
                {index < 4 && <div className="w-6 sm:w-8 h-0.5 bg-muted mx-2 sm:mx-4 mt-[-20px] sm:mt-[-24px]" />}
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="scanner" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
            <TabsTrigger value="scanner" className="text-xs sm:text-sm">
              Bill Scanner
            </TabsTrigger>
            <TabsTrigger value="friends" className="text-xs sm:text-sm">
              Manage Friends
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">
              Bill History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6 sm:space-y-8">
            {/* Step 1: Upload Receipt */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Upload className="w-5 h-5" />
                    Upload Receipt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 sm:p-12 text-center">
                    <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Upload your receipt</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto">
                      Support for JPG, PNG, and PDF files. Our OCR will extract all items automatically.
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm mx-auto">
                      <Button onClick={() => fileInputRef.current?.click()} size="lg" className="w-full sm:w-auto">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Choose File
                      </Button>
                      <Button
                        variant="outline"
                        onClick={processOCR}
                        size="lg"
                        className="w-full sm:w-auto bg-transparent"
                      >
                        <Receipt className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Try Demo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Processing */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <ScanLine className="w-5 h-5" />
                    Processing Receipt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <ScanLine className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-pulse" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Scanning receipt...</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto">
                      Our AI is extracting items, prices, and quantities from your receipt.
                    </p>
                    <div className="max-w-xs sm:max-w-md mx-auto">
                      <Progress value={ocrProgress} className="h-2 sm:h-3" />
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2">{ocrProgress}% complete</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review Items */}
            {currentStep >= 3 && billItems.length > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Receipt className="w-5 h-5" />
                      Extracted Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                      {billItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg"
                        >
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={(e) =>
                              setBillItems(
                                billItems.map((i) => (i.id === item.id ? { ...i, selected: e.target.checked } : i)),
                              )
                            }
                            className="w-4 h-4 rounded mt-1 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Input
                              value={item.name}
                              onChange={(e) =>
                                setBillItems(
                                  billItems.map((i) => (i.id === item.id ? { ...i, name: e.target.value } : i)),
                                )
                              }
                              className="font-medium mb-2 text-sm sm:text-base"
                            />
                            <div className="flex flex-col sm:flex-row gap-2">
                              <div className="flex items-center gap-1">
                                <span className="text-xs sm:text-sm text-muted-foreground">₹</span>
                                <Input
                                  type="number"
                                  value={item.price}
                                  onChange={(e) => updateItemPrice(item.id, Number(e.target.value))}
                                  className="w-20 sm:w-24 h-8 text-sm"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs sm:text-sm text-muted-foreground">Qty:</span>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateItemQuantity(item.id, Number(e.target.value))}
                                  className="w-16 sm:w-20 h-8 text-sm"
                                  min="1"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-semibold text-sm sm:text-base">₹{item.price * item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/10 rounded-lg">
                      <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                        <span>Selected Total:</span>
                        <span className="text-primary">₹{totalBill}</span>
                      </div>
                    </div>
                    {currentStep === 3 && (
                      <Button onClick={() => setCurrentStep(4)} className="w-full mt-4" size="lg">
                        Continue to Split Bill
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {uploadedImage && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Camera className="w-5 h-5" />
                        Uploaded Receipt
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative bg-muted/30 rounded-lg overflow-hidden">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded receipt"
                          className="w-full h-auto max-h-96 object-contain rounded-lg"
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center">
                        Receipt processed successfully
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Step 4: Split Bill */}
                {currentStep >= 4 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Users className="w-5 h-5" />
                        Split with Friends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        {friends.map((friend) => (
                          <div
                            key={friend.id}
                            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg"
                          >
                            <input
                              type="checkbox"
                              checked={friend.selected}
                              onChange={(e) =>
                                setFriends(
                                  friends.map((f) => (f.id === friend.id ? { ...f, selected: e.target.checked } : f)),
                                )
                              }
                              className="w-4 h-4 rounded flex-shrink-0"
                            />
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm sm:text-base truncate">{friend.name}</div>
                              <div className="text-xs sm:text-sm text-muted-foreground truncate">{friend.email}</div>
                              <div className="text-xs sm:text-sm text-muted-foreground">{friend.phone}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 sm:p-6 bg-primary/10 rounded-xl mb-4 sm:mb-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm sm:text-base">
                            <span>Total Bill:</span>
                            <span className="font-semibold">₹{totalBill}</span>
                          </div>
                          <div className="flex justify-between text-sm sm:text-base">
                            <span>Split between:</span>
                            <span>{selectedFriends.length + 1} people</span>
                          </div>
                          <div className="flex justify-between text-lg sm:text-xl font-bold text-primary">
                            <span>Each pays:</span>
                            <span>₹{splitAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {currentStep === 4 && (
                        <Button
                          onClick={generateInvoices}
                          disabled={selectedFriends.length === 0}
                          className="w-full"
                          size="lg"
                        >
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Generate & Send Invoices
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 5: Success */}
            {currentStep === 5 && (
              <Card>
                <CardContent className="text-center py-8 sm:py-12">
                  <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Invoices Sent Successfully!</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
                    Payment requests have been sent to {selectedFriends.length} friends via email and SMS.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm mx-auto">
                    <Button onClick={resetProcess} variant="outline" className="w-full sm:w-auto bg-transparent">
                      Scan Another Bill
                    </Button>
                    <Button onClick={() => window.print()} className="w-full sm:w-auto">
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="friends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-lg sm:text-xl">
                    <Users className="w-5 h-5" />
                    Manage Friends
                  </span>
                  <Button onClick={() => setShowAddFriend(true)} size="sm" className="text-sm">
                    <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Add Friend</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <User className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm sm:text-base truncate">{friend.name}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground truncate">{friend.email}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">{friend.phone}</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFriend(friend.id)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Dialog open={showAddFriend} onOpenChange={setShowAddFriend}>
              <DialogContent className="max-w-[95vw] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Friend</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newFriend.name}
                      onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
                      placeholder="Enter friend's name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newFriend.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="Enter email address"
                      className={`mt-1 ${emailError ? "border-red-500" : ""}`}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={newFriend.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="Enter phone number (+91 XXXXXXXXXX)"
                      className={`mt-1 ${phoneError ? "border-red-500" : ""}`}
                    />
                    {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={addFriend} className="flex-1">
                      Add Friend
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddFriend(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <History className="w-5 h-5" />
                  Bill History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {billHistory.map((bill) => (
                    <div key={bill.id} className="p-3 sm:p-4 bg-muted/50 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-base sm:text-lg truncate">{bill.restaurant}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">{bill.date}</div>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0">
                          <div className="font-semibold text-base sm:text-lg">₹{bill.total}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            Split with {bill.friends.length} friends
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                        {bill.friends.map((friend, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {friend}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {bill.items.length} items • Each paid: ₹{(bill.total / (bill.friends.length + 1)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </main>
  )
}
