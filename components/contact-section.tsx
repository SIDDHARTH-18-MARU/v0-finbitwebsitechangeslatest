"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Users, Smartphone, Send, CheckCircle, Sparkles, ArrowRight } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "general",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleContactSupport = () => {
    const supportEmail = "support@finbit.app"
    const subject = "Support Request"
    const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`

    try {
      // Try to open mailto link
      window.location.href = mailtoLink

      // Fallback: If mailto doesn't work, show alert with email
      setTimeout(() => {
        const userAgent = navigator.userAgent.toLowerCase()
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)

        if (isMobile) {
          // On mobile, try alternative approach
          const confirmed = confirm(
            `Opening email app failed. Would you like to copy our support email (${supportEmail}) to clipboard?`,
          )
          if (confirmed) {
            navigator.clipboard
              ?.writeText(supportEmail)
              .then(() => {
                alert(`Email ${supportEmail} copied to clipboard!`)
              })
              .catch(() => {
                alert(`Please email us at: ${supportEmail}`)
              })
          }
        }
      }, 1000)
    } catch (error) {
      // Fallback for any errors
      alert(`Please contact our support team at: ${supportEmail}`)
    }
  }

  const contactOptions = [
    {
      icon: Users,
      title: "Campus Ambassador Program",
      description: "Join our student ambassador network and earn rewards",
      action: "Apply Now",
      badge: "Popular",
    },
    {
      icon: MessageSquare,
      title: "General Support",
      description: "Questions about features, pricing, or technical issues",
      action: "Contact Support",
      badge: null,
    },
    {
      icon: Smartphone,
      title: "Partnership Inquiries",
      description: "College partnerships, fintech integrations, and collaborations",
      action: "Partner With Us",
      badge: null,
    },
  ]

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance mb-3 sm:mb-4 leading-tight">
            Get in touch
            <br />
            <span className="text-primary">{"We're here to help"}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-2xl mx-auto px-2">
            {
              "Have questions about FinBit? Want to become a campus ambassador? Or interested in partnerships? We'd love to hear from you."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {contactOptions.map((option, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] group bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <option.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  {option.badge && (
                    <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                      {option.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {option.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {option.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={() => {
                    if (option.action === "Apply Now") {
                      window.location.href = "/signup?type=ambassador"
                    } else if (option.action === "Contact Support") {
                      handleContactSupport()
                    } else if (option.action === "Partner With Us") {
                      window.location.href = "/signup?type=partner"
                    }
                  }}
                >
                  {option.action}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Message sent successfully!</h3>
                  <p className="text-muted-foreground text-sm">{"We'll get back to you within 24 hours."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-11 sm:h-12"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-11 sm:h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell us about your inquiry..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 sm:h-12 text-base">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-muted-foreground mb-4 px-2">{"Prefer email? Reach us directly at"}</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-sm">
            <a
              href="mailto:hello@finbit.app"
              className="text-primary hover:underline transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
            >
              hello@finbit.app
            </a>
            <a
              href="mailto:partnerships@finbit.app"
              className="text-primary hover:underline transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
            >
              partnerships@finbit.app
            </a>
            <a
              href="mailto:support@finbit.app"
              className="text-primary hover:underline transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
            >
              support@finbit.app
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
