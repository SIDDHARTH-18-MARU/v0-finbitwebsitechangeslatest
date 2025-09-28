"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free Trial",
    price: "₹0",
    period: "1 month",
    description: "Perfect for trying out FinBit",
    features: [
      "Basic expense tracking",
      "SMS parsing (limited)",
      "Manual categorization",
      "Basic reminders",
      "Mobile app access",
    ],
    cta: "Start Free Trial",
    popular: false,
    hoverColor: "#F59E0B", // yellow
  },
  {
    name: "FinBit Pro",
    price: "₹49",
    period: "per month",
    description: "Everything you need for smart finance management",
    features: [
      "Unlimited expense tracking",
      "AI-powered categorization",
      "Offline SMS parsing",
      "Bill scanning & splitting",
      "Gamified savings challenges",
      "Smart bill reminders",
      "Cloud sync across devices",
      "Ad-free experience",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
    hoverColor: "#F59E0B", // yellow
  },
  {
    name: "Student Special",
    price: "₹39",
    period: "per month",
    description: "Discounted pricing for verified students",
    features: [
      "All Pro features",
      "Student verification required",
      "Campus ambassador perks",
      "Exclusive student challenges",
      "College partnership benefits",
    ],
    cta: "Verify Student Status",
    popular: false,
    hoverColor: "#F59E0B", // yellow
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance mb-3 sm:mb-4 leading-tight text-foreground">
            Simple, affordable pricing
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              built for students
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-2xl mx-auto px-2">
            {"Start with a free trial, then choose the plan that fits your budget. No hidden fees, cancel anytime."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative card-glow pricing-card-hover transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 ${
                plan.popular ? "border-primary/50 shadow-2xl sm:scale-105" : "border-primary/20"
              } ${plan.popular && plans.length === 3 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={
                {
                  "--hover-border-color": plan.hoverColor,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                const card = e.currentTarget
                card.style.borderColor = plan.hoverColor
                card.style.boxShadow = `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px ${plan.hoverColor}40`
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget
                card.style.borderColor = plan.popular ? "hsl(var(--primary) / 0.5)" : "hsl(var(--primary) / 0.2)"
                card.style.boxShadow = plan.popular
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
              }}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg sm:text-xl text-card-foreground">{plan.name}</CardTitle>
                <div className="mt-3 sm:mt-4">
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-sm sm:text-base text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 px-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <ul className="space-y-2 sm:space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm leading-relaxed text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.name === "Student Special" ? (
                  <Link href="/verify-student">
                    <Button
                      className={`w-full text-sm sm:text-base transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-button border-0"
                          : "bg-transparent border-primary/40 text-primary glow-hover hover:bg-primary/10"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                ) : (
                  <Link href="/signup">
                    <Button
                      className={`w-full text-sm sm:text-base transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-button border-0"
                          : "bg-transparent border-primary/40 text-primary glow-hover hover:bg-primary/10"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-muted-foreground mb-4 px-4">
            {"Trusted by students across India • Join thousands of happy users"}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground px-4">
            <span>{"💳 All payment methods"}</span>
            <span>{"🔒 Secure payments"}</span>
            <span>{"📱 Cancel anytime"}</span>
            <span>{"🎓 Student discounts"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
