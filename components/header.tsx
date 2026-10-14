"use client"

import { useState } from "react"
import Link from "next/link"
import { Scale, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#d4af37]/20 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Scale className="h-7 w-7 sm:h-8 sm:w-8 text-[#d4af37]" />
          <span className="text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-[#d4af37]">Dharm</span>
            <span className="text-foreground">Setu</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#d4af37]"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#d4af37]"
          >
            About
          </Link>
          <Link
            href="/lawyers"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#d4af37]"
          >
            Lawyers
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button
              variant="outline"
              className="border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-[#d4af37] text-black hover:bg-[#c4a030] font-semibold">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="#features"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-[#d4af37] py-2"
                >
                  Features
                </Link>
                <Link
                  href="#about"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-[#d4af37] py-2"
                >
                  About
                </Link>
                <Link
                  href="/lawyers"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-[#d4af37] py-2"
                >
                  Lawyers
                </Link>
                <div className="border-t border-[#d4af37]/20 pt-4 mt-4 space-y-3">
                  <Link href="/auth/login" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-[#d4af37] text-black hover:bg-[#c4a030] font-semibold">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
