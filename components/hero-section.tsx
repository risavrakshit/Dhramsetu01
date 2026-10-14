"use client"

import Link from "next/link"
import { ArrowRight, Shield, Users, Brain, Scale, Gavel, Building } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8">
        <div className="flex flex-col items-center text-center animate-fade-in">
          {/* Badge */}
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-[#d4af37]">
            <Scale className="h-3 w-3 sm:h-4 sm:w-4" />
            <span
              style={{
                fontSize: "18px",
                fontStyle: "italic",
                color: "#ff0200",
                fontFamily: "inherit",
                boxShadow: "none",
                textDecoration: "none",
                textTransform: "none",
              }}
            >
              सत्यं न्यायं च संयोजयति
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-foreground">Connecting You to</span>
            <br />
            <span className="text-gold-gradient">
              Justice & Legal Wisdom
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-pretty text-base sm:text-lg text-muted-foreground md:text-xl leading-relaxed px-2">
            DharmSetu bridges the gap between citizens and legal professionals.
            Find trusted lawyers, get AI-powered case insights, and access
            mental wellness support all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 w-full sm:w-auto sm:flex-row px-4 sm:px-0">
            <Link href="/auth/signup?type=customer" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-14 gap-2 bg-[#d4af37] px-6 sm:px-8 text-base sm:text-lg text-black hover:bg-[#c4a030] font-semibold hover-lift"
              >
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Are You a Customer?
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/auth/lawyer-login" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 sm:h-14 border-[#d4af37]/50 px-6 sm:px-8 text-base sm:text-lg text-[#d4af37] hover:bg-[#d4af37]/10 hover-lift"
              >
                <Gavel className="h-4 w-4 sm:h-5 sm:w-5" />
                Are You a Lawyer?
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="mt-12 sm:mt-16 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full px-2 sm:px-0">
            <div className="flex items-center gap-3 rounded-xl border border-[#d4af37]/30 bg-card/50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm hover-lift">
              <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm sm:text-base">Case Insight Engine</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  AI-powered legal analysis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#d4af37]/30 bg-card/50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm hover-lift">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm sm:text-base">The Counsel Corner</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Mental wellness support
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#d4af37]/30 bg-card/50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm hover-lift sm:col-span-2 lg:col-span-1">
              <Building className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm sm:text-base">Hall of Advocates</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Verified legal professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
