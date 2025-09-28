"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Star, Award, CheckCircle, ArrowLeft, Sparkles, Target, Zap } from "lucide-react"
import Link from "next/link"

export default function GamifiedSavings() {
  const [currentSavings, setCurrentSavings] = useState(3200)
  const [points, setPoints] = useState(1250)
  const savingsGoal = 5000
  const savingsProgress = (currentSavings / savingsGoal) * 100

  const completeChallenge = (amount: number, pointsEarned: number) => {
    setCurrentSavings(currentSavings + amount)
    setPoints(points + pointsEarned)
  }

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
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Gamified Savings</h1>
                <p className="text-muted-foreground">Turn saving money into a fun game</p>
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
                  <h2 className="text-xl font-semibold mb-2">How Gamified Savings Works</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Turn saving money into a fun game! Set savings goals, complete daily challenges, earn points and
                    badges, and compete with friends. Make financial discipline enjoyable and rewarding with our
                    gamification system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">{points}</div>
                <div className="text-muted-foreground">Total Points</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">₹{currentSavings}</div>
                <div className="text-muted-foreground">Current Savings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">{savingsProgress.toFixed(0)}%</div>
                <div className="text-muted-foreground">Goal Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Savings Dashboard */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Monthly Savings Goal</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span>Progress</span>
                      <span className="font-semibold">
                        ₹{currentSavings} / ₹{savingsGoal}
                      </span>
                    </div>
                    <Progress value={savingsProgress} className="h-4" />
                    <div className="text-sm text-muted-foreground">
                      {savingsProgress.toFixed(1)}% complete • ₹{savingsGoal - currentSavings} remaining
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Daily Challenge</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-lg">Skip one coffee today</div>
                          <div className="text-muted-foreground">Save ₹100 • Earn 50 points</div>
                        </div>
                        <Button onClick={() => completeChallenge(100, 50)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-lg">Walk instead of taking cab</div>
                          <div className="text-muted-foreground">Save ₹80 • Earn 40 points</div>
                        </div>
                        <Button onClick={() => completeChallenge(80, 40)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements & Challenges */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Achievement Badges</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg border">
                      <Star className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                      <div className="font-semibold">Saver</div>
                      <div className="text-sm text-green-600">Earned</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg border opacity-60">
                      <Award className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <div className="font-semibold">Super Saver</div>
                      <div className="text-xs text-muted-foreground">₹500 more</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg border opacity-60">
                      <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <div className="font-semibold">Money Master</div>
                      <div className="text-xs text-muted-foreground">₹2000 more</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Weekly Challenges</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Cook at home 5 times</div>
                          <div className="text-sm text-muted-foreground">3/5 completed</div>
                          <Progress value={60} className="h-2 mt-2" />
                        </div>
                        <div className="text-sm font-semibold text-primary">200 pts</div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Use public transport</div>
                          <div className="text-sm text-muted-foreground">Save on cab fares</div>
                          <Progress value={25} className="h-2 mt-2" />
                        </div>
                        <div className="text-sm font-semibold text-primary">150 pts</div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">No online shopping</div>
                          <div className="text-sm text-muted-foreground">Avoid impulse purchases</div>
                          <Progress value={85} className="h-2 mt-2" />
                        </div>
                        <div className="text-sm font-semibold text-primary">300 pts</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Leaderboard</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                          1
                        </div>
                        <span className="font-semibold">You</span>
                      </div>
                      <span className="font-bold text-yellow-600">{points} pts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                          2
                        </div>
                        <span>Rahul</span>
                      </div>
                      <span className="font-semibold">1180 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                        <span>Priya</span>
                      </div>
                      <span className="font-semibold">1050 pts</span>
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
