import {
  Scale,
  FileSearch,
  MessageCircle,
  Shield,
  Clock,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Scale,
    title: "Lawyer Directory",
    description:
      "Browse through verified legal professionals categorized by expertise. Find the right lawyer for your specific needs.",
  },
  {
    icon: FileSearch,
    title: "AI Case Analysis",
    description:
      "Get instant insights on your legal case using advanced AI. Understand potential outcomes and recommended actions.",
  },
  {
    icon: MessageCircle,
    title: "Mental Wellness Support",
    description:
      "Access our AI-powered chatbot for emotional support during stressful legal proceedings.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is protected with enterprise-grade security. All communications are encrypted and confidential.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Access legal resources and AI support anytime, anywhere. Justice never sleeps, and neither do we.",
  },
  {
    icon: Users,
    title: "For Lawyers & Citizens",
    description:
      "Dual platform supporting both legal professionals and citizens seeking legal assistance.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-foreground">Features that</span>{" "}
            <span className="text-amber-500">Empower Justice</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            DharmSetu provides comprehensive tools to bridge the gap between
            legal professionals and those seeking justice.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-amber-500/20 bg-card/50 backdrop-blur-sm transition-all hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 transition-colors group-hover:bg-amber-500/20">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
