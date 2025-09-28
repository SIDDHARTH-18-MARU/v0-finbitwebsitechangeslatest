import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Shield, Zap, Award, Sparkles } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Accessibility",
    description: "Financial tools should be available to everyone, regardless of income level.",
  },
  {
    icon: Zap,
    title: "Simplicity",
    description: "Complex finance made simple through intuitive design and smart automation.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear pricing, honest communication, and no hidden fees or surprises.",
  },
  {
    icon: Award,
    title: "Empowerment",
    description: "Helping users build sustainable money habits and achieve financial wellness.",
  },
]

const stats = [
  { label: "Target Users", value: "10,000+", description: "Break-even point" },
  { label: "Monthly Price", value: "₹49", description: "Affordable for students" },
  { label: "Free Trial", value: "1 Month", description: "Risk-free start" },
  { label: "Market Focus", value: "India", description: "Youth-first approach" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 to-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            About FinBit
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance mb-4 sm:mb-6 leading-tight">
            {"India's most trusted"}
            <br />
            <span className="text-primary">financial wellness companion for youth</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-3xl mx-auto px-2">
            {
              "FinBit addresses the core financial challenges faced by college students, hostel residents, and young professionals through innovative technology and youth-focused design."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-border/50 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              {
                "Help users stay financially healthy by tracking expenses, controlling impulse spending, and building sustainable money habits through AI-powered insights and gamified experiences."
              }
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Poor Budgeting Solutions</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {"Most apps are complex and expensive for students"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Impulse Spending Control</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {"Gamified challenges help build better spending habits"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Missed Bill Deadlines</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {"Smart reminders prevent late fees and penalties"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-border/50 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              Our Vision
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              {
                "Become India's most trusted financial wellness companion for youth, empowering the next generation to make smarter financial decisions."
              }
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm"
                >
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs sm:text-sm font-medium">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Our Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm text-center bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base group-hover:text-primary transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
