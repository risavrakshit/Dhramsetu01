import { Scale } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-amber-500/20 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-amber-500" />
              <span className="text-lg font-bold">
                <span className="text-amber-500">Dharm</span>
                <span className="text-foreground">Setu</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Bridging the gap between citizens and justice. Your trusted
              platform for legal assistance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Platform</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/lawyers"
                  className="text-sm text-muted-foreground hover:text-amber-500"
                >
                  Find Lawyers
                </Link>
              </li>
              <li>
                <Link
                  href="/customer"
                  className="text-sm text-muted-foreground hover:text-amber-500"
                >
                  Case Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/customer/wellness"
                  className="text-sm text-muted-foreground hover:text-amber-500"
                >
                  Mental Wellness
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">For Lawyers</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/auth/signup"
                  className="text-sm text-muted-foreground hover:text-amber-500"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/lawyer"
                  className="text-sm text-muted-foreground hover:text-amber-500"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-amber-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-amber-500"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-amber-500/20 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} DharmSetu | Satyameva Jayate<br />
            Made by ~Robin
          </p>
        </div>
      </div>
    </footer>
  )
}
