import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Brain, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    href: "/customer/lawyers",
    icon: Users,
    title: "Find Lawyers",
    description: "Browse verified legal professionals by category and expertise",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    href: "/customer/case-analysis",
    icon: Brain,
    title: "AI Case Analysis",
    description: "Get AI-powered insights and analysis for your legal case",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    href: "/customer/wellness",
    icon: Heart,
    title: "Mental Wellness",
    description: "Access emotional support during stressful legal proceedings",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
]

export default function CustomerDashboard() {
  return (
    <div className="p-3 sm:p-4 md:p-8 overflow-y-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Customer Portal</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Access legal resources, AI-powered analysis, and wellness support
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.href}
            className="group border-amber-500/20 transition-all hover:border-amber-500/40 hover:shadow-lg"
          >
            <CardHeader>
              <div
                className={`mb-2 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={feature.href}>
                <Button
                  variant="ghost"
                  className="group-hover:text-amber-500"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12">
        <Card className="border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-transparent">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Need Legal Help?</CardTitle>
            <CardDescription className="text-sm">
              DharmSetu connects you with verified legal professionals and provides
              AI-powered tools to help you understand your legal situation better.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/customer/lawyers" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-amber-500 text-white hover:bg-amber-600">
                  Find a Lawyer
                </Button>
              </Link>
              <Link href="/customer/case-analysis" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-amber-500/30 hover:bg-amber-500/10">
                  Analyze Your Case
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
