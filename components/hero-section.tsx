import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 sm:mb-6 bg-white/20 border-primary/30 text-primary glow-hover">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
            {"Now Available for Students"}
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-4 sm:mb-6 leading-tight text-foreground">
            Smart Finance for
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
              Students & Young Professionals
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-6 sm:mb-8 px-2 leading-relaxed">
            {
              "Track expenses with AI-powered categorization, offline SMS parsing, and gamified savings challenges. Built specifically for India's youth at just ₹49/month."
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-base px-6 sm:px-8 w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-button border-0 hover:shadow-lg transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-6 sm:px-8 w-full sm:w-auto bg-transparent border-primary/40 text-primary glow-hover hover:bg-primary/10"
            >
              <Play className="mr-2 w-4 h-4" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
