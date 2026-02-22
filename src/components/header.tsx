
"use client"

import Link from "next/link"
import NextImage from "next/image"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menu, X } from "lucide-react"
import { motion, useScroll } from "framer-motion"
import { cn } from "../lib/utils"

const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/career", label: "Career" },
    { href: "/order", label: "Order" },
    { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50)
    })
  }, [scrollY])

  const closeSheet = () => setIsSheetOpen(false)

  return (
    <motion.header
      className={cn(
        "px-4 lg:px-6 h-20 flex items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
        <NextImage src="/logos/m-a-global/logo.svg" alt="M A Global Network Logo" width={32} height={32} />
        <span className="text-lg font-bold whitespace-nowrap text-primary">M A Global Network</span>
      </Link>
      
      <div className="ml-auto flex items-center gap-4">
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary px-3 py-2" prefetch={false}>
                    {link.label}
                </Link>
            ))}
            <Button asChild className="ml-4">
              <Link href="/login" prefetch={false}>
                  Cloud-x.in Login
              </Link>
          </Button>
        </nav>

        {/* Mobile menu trigger */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-background">
            <SheetHeader className="flex flex-row items-center justify-between">
              <SheetTitle>
                <Link href="/" onClick={closeSheet} className="flex items-center gap-2">
                  <NextImage src="/logos/m-a-global/logo.svg" alt="M A Global Network Logo" width={28} height={28} />
                  <span className="font-bold text-md text-primary">M A Global Network</span>
                </Link>
              </SheetTitle>
               <Button variant="ghost" size="icon" onClick={closeSheet}>
                 <X className="h-5 w-5" />
                 <span className="sr-only">Close menu</span>
               </Button>
            </SheetHeader>
            <div className="grid gap-2 py-8">
              {navLinks.map((link) => (
                <motion.div whileTap={{ scale: 0.97 }} key={link.href}>
                  <Link href={link.href} className="flex w-full items-center py-3 text-2xl font-semibold rounded-md px-2 hover:bg-secondary" prefetch={false} onClick={closeSheet}>
                      {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button asChild className="w-full mt-8" size="lg">
                  <Link href="/login" prefetch={false} onClick={closeSheet}>
                    Cloud-x.in Login
                  </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
