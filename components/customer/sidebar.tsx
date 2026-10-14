"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Scale, Users, Brain, Heart, Home, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/customer", label: "Dashboard", icon: Home },
  { href: "/customer/case-analysis", label: "Case Insight Engine", icon: Brain },
  { href: "/customer/wellness", label: "The Counsel Corner", icon: Heart },
  { href: "/customer/lawyers", label: "Hall of Advocates", icon: Users },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-[#d4af37]/20 px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={onNavigate}>
          <Scale className="h-6 w-6 text-[#d4af37]" />
          <span className="text-lg font-bold">
            <span className="text-[#d4af37]">Dharm</span>
            <span className="text-sidebar-foreground">Setu</span>
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30"
                  : "text-sidebar-foreground hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-[#d4af37]/20 p-4 space-y-1">
        <Link href="/" onClick={onNavigate}>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-all duration-200">
            <Home className="h-5 w-5" />
            Back to Home
          </div>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </>
  )
}

export function CustomerSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-[#d4af37]/20 bg-background/95 backdrop-blur px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-[#d4af37]" />
          <span className="text-lg font-bold">
            <span className="text-[#d4af37]">Dharm</span>
            <span className="text-foreground">Setu</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-sidebar">
              <div className="flex h-full flex-col">
                <SidebarContent onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-[#d4af37]/20 bg-sidebar">
        <SidebarContent />
      </aside>
    </>
  )
}
