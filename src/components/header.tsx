
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center gap-2 text-primary" prefetch={false}>
        <Image src="/logos/m-a-global/logo.svg" alt="M A Global Network Logo" width={32} height={32} />
        <span className="text-lg font-bold whitespace-nowrap">M A Global Network</span>
      </Link>
      
      <div className="ml-auto flex items-center gap-4">
        
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/products" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary inline-block hover:-translate-y-px" prefetch={false}>
            Products
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary inline-block hover:-translate-y-px" prefetch={false}>
            Pricing
          </Link>
           <Link href="/order" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary inline-block hover:-translate-y-px" prefetch={false}>
            Order
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary inline-block hover:-translate-y-px" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary inline-block hover:-translate-y-px" prefetch={false}>
            Contact
          </Link>
           <Button asChild>
              <Link href="/login" prefetch={false}>
                  Cloud-x.in Login
              </Link>
          </Button>
        </nav>

        {/* Mobile menu trigger */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 py-6">
              <Link href="/" className="flex w-full items-center py-3 text-xl font-bold" prefetch={false} onClick={closeSheet}>
                Home
              </Link>
              <Link href="/products" className="flex w-full items-center py-3 text-xl font-bold" prefetch={false} onClick={closeSheet}>
                Products
              </Link>
              <Link href="/pricing" className="flex w-full items-center py-3 text-xl font-bold" prefetch={false} onClick={closeSheet}>
                Pricing
              </Link>
              <Link href="/order" className="flex w-full items-center py-3 text-xl font-bold" prefetch={false} onClick={closeSheet}>
                Order
              </Link>
              <Link href="/about" className="flex w-full items-center py-3 text-xl font-bold" prefetch={false} onClick={closeSheet}>
                About
              </Link>
              <Link href="/contact" className="flex w-full items-center py-3 text-xl font-bold" prefetch={false} onClick={closeSheet}>
                Contact
              </Link>
              <Button asChild className="w-full mt-6">
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
