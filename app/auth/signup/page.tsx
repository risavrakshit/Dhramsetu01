"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Scale, Gavel, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"lawyer" | "customer">("customer")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "lawyer" || type === "customer") {
      setUserType(type)
    }
  }, [searchParams])

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
          `${window.location.origin}/auth/callback`,
        data: {
          user_type: userType,
        },
      },
    })

    if (signUpError) {
      if (signUpError.message.includes("rate limit") || signUpError.message.includes("Rate limit")) {
        setError("Too many signup attempts. Please try signing in with Google instead, or wait a few minutes before trying again.")
      } else if (signUpError.message.includes("already registered")) {
        setError("This email is already registered. Please sign in instead.")
      } else {
        setError(signUpError.message)
      }
      setLoading(false)
      return
    }

    if (signUpData.session) {
      localStorage.setItem("dharmsetu_user_type", userType)
      if (userType === "lawyer") {
        router.push("/lawyer")
      } else {
        router.push("/customer")
      }
      router.refresh()
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError(null)

    localStorage.setItem("dharmsetu_user_type", userType)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
          `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md border-[#d4af37]/30 bg-card/80 backdrop-blur-sm animate-scale-in">
        <CardHeader className="text-center">
          <Scale className="mx-auto h-12 w-12 text-[#d4af37]" />
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            We sent you a confirmation link. Please check your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full border-[#d4af37]/30 hover:bg-[#d4af37]/10">
              Back to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-[#d4af37]/30 bg-card/80 backdrop-blur-sm animate-scale-in hover-lift">
      <CardHeader className="text-center">
        <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
          <Scale className="h-8 w-8 text-[#d4af37]" />
          <span className="text-2xl font-bold">
            <span className="text-[#d4af37]">Dharm</span>
            <span className="text-foreground">Setu</span>
          </span>
        </Link>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>
          Join DharmSetu to access legal services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <Label>I am a</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUserType("customer")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all duration-200",
                userType === "customer"
                  ? "border-[#d4af37] bg-[#d4af37]/10"
                  : "border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5"
              )}
            >
              <Users className={cn("h-8 w-8", userType === "customer" ? "text-[#d4af37]" : "text-muted-foreground")} />
              <span className={cn("text-sm font-medium", userType === "customer" ? "text-[#d4af37]" : "text-foreground")}>
                Customer
              </span>
              <span className="text-xs text-muted-foreground text-center">Seeking legal help</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType("lawyer")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all duration-200",
                userType === "lawyer"
                  ? "border-[#d4af37] bg-[#d4af37]/10"
                  : "border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5"
              )}
            >
              <Gavel className={cn("h-8 w-8", userType === "lawyer" ? "text-[#d4af37]" : "text-muted-foreground")} />
              <span className={cn("text-sm font-medium", userType === "lawyer" ? "text-[#d4af37]" : "text-foreground")}>
                Lawyer
              </span>
              <span className="text-xs text-muted-foreground text-center">Legal professional</span>
            </button>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37]"
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#d4af37]/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#d4af37]/30 focus:border-[#d4af37]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="border-[#d4af37]/30 focus:border-[#d4af37]"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#d4af37] text-black hover:bg-[#c4a030] font-semibold"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#d4af37] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-[#d4af37]/5 p-4">
      <Suspense fallback={
        <Card className="w-full max-w-md border-[#d4af37]/30 bg-card/80 backdrop-blur-sm animate-pulse">
          <CardHeader className="text-center">
            <Scale className="mx-auto h-8 w-8 text-[#d4af37]" />
            <CardTitle className="text-2xl">Loading...</CardTitle>
          </CardHeader>
        </Card>
      }>
        <SignupForm />
      </Suspense>
    </div>
  )
}
