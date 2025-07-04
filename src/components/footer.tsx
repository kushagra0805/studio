import Link from "next/link"
import { Cloud } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">MA Global Network</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} MA Global Network. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-sm hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm hover:underline underline-offset-4" prefetch={false}>
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
