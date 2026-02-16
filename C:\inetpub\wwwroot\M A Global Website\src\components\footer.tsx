
"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 text-center md:text-left md:grid-cols-4">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4 text-primary" prefetch={false}>
              <Image src="/logos/m-a-global/logo.svg" alt="M A Global Network Logo" width={28} height={28} />
              <span className="text-xl font-bold">M A Global Network</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Powering your digital future with reliable and secure cloud solutions.
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
                <a href="mailto:info@cloud-x.in" className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    <span>info@cloud-x.in</span>
                </a>
                <a href="tel:7024058800" className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    <span>7024058800</span>
                </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Solutions</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/products#vps" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Virtual Servers</Link>
              <Link href="/products#dedicated" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Dedicated Servers</Link>
              <Link href="/cloud-x" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Shared Service (Cloud-x.in)</Link>
              <Link href="/products#web-hosting" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Web Hosting</Link>
              <Link href="/products#colocation" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Colocation</Link>
              <Link href="/products#on-premise-cloud" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>On-premise Cloud</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>About Us</Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Pricing</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Contact Us</Link>
              <Link href="/order" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Order Now</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Terms of Service</Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Privacy Policy</Link>
              <Link href="/aup" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Acceptable Use Policy</Link>
              <Link href="/sla" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Service Level Agreement</Link>
              <Link href="/msa" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Master Service Agreement</Link>
              <Link href="/colocation-policy" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-transform duration-200 inline-block hover:-translate-y-px" prefetch={false}>Colocation Policy</Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {year} M A Global Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
