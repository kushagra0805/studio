"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Cloud } from "lucide-react"

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
        <Cloud className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">MA Global Network</span>
      </Link>
      <nav className="ml-auto hidden gap-4 sm:gap-6 lg:flex">
        <Link href="/products" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Products
        </Link>
        <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Pricing
        </Link>
        <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <Button asChild variant="outline" className="hidden lg:flex">
            <Link href="/login" prefetch={false}>
                Cloud-x.in Login
            </Link>
        </Button>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 py-6">
              <Link href="/products" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false} onClick={closeSheet}>
                Products
              </Link>
              <Link href="/pricing" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false} onClick={closeSheet}>
                Pricing
              </Link>
              <Link href="/about" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false} onClick={closeSheet}>
                About Us
              </Link>
              <Link href="/contact" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false} onClick={closeSheet}>
                Contact
              </Link>
              <Button asChild className="w-full mt-4">
                  <Link href="/login" prefetch={false} onClick={closeSheet}>
                    Cloud-x.in Login
                  </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
