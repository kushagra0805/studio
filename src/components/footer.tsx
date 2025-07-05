
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 text-center md:text-left md:grid-cols-4">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
              <Image src="/logos/m-a-global/logo.svg" alt="M A Global Network Logo" width={28} height={28} />
              <span className="text-xl font-bold text-foreground">M A Global Network</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Powering your digital future with reliable and secure cloud solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Solutions</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/products#vps" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Virtual Servers</Link>
              <Link href="/products#dedicated" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Dedicated Servers</Link>
              <Link href="/cloud-x" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Shared Service (Cloud-x.in)</Link>
              <Link href="/products#web-hosting" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Web Hosting</Link>
              <Link href="/products#colocation" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Colocation</Link>
              <Link href="/products#on-premise-cloud" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>On-premise Cloud</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>About Us</Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Pricing</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Contact Us</Link>
              <Link href="/order" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Order Now</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Terms of Service</Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Privacy Policy</Link>
              <Link href="/aup" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Acceptable Use Policy</Link>
              <Link href="/sla" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Service Level Agreement</Link>
              <Link href="/msa" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Master Service Agreement</Link>
              <Link href="/colocation-policy" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>Colocation Policy</Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            {year ? `© ${year} M A Global Network. All rights reserved.` : `© M A Global Network. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
