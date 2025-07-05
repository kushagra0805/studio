
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Globe, Server, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function CloudXPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-secondary py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
           <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
           >
            <div className="inline-block rounded-lg bg-primary/10 px-4 py-2 mb-4">
                <h2 className="text-xl font-bold tracking-tighter text-primary">
                    Shared Service (Cloud-x.in)
                </h2>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
              Your Accounting, Unleashed on the Cloud
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
              Securely run Tally, Busy, and other accounting software from any device, anywhere in the world. No servers, no maintenance—just seamless performance.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/order">Get Started Now</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Request a Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tight">The Freedom of Cloud Accounting</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Focus on your business, not your IT. We handle the infrastructure so you can thrive.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeIn}>
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Globe className="h-8 w-8" />
                  </div>
                  <CardTitle>Work From Anywhere</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Access your Tally or Busy data from your office, home, or on the go from any device.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <CardTitle>Blazing-Fast Speed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our enterprise-grade servers ensure your software runs faster than ever before.</p>
                </CardContent>
              </Card>
            </motion.div>
             <motion.div variants={fadeIn}>
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Server className="h-8 w-8" />
                  </div>
                  <CardTitle>Zero Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No more server crashes or IT headaches. We manage all updates, security, and uptime.</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Secure, and Ready in Minutes</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Our migration process is designed to get you up and running on the cloud with zero downtime.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                <div>
                  <h3 className="font-semibold">We Migrate Your Data</h3>
                  <p className="text-muted-foreground">Our experts securely transfer your existing Tally/Busy data to your dedicated cloud instance.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">2</div>
                <div>
                  <h3 className="font-semibold">You Connect Securely</h3>
                  <p className="text-muted-foreground">We provide you with a simple, secure login file (RDP) or a web portal to access your software.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                <div>
                  <h3 className="font-semibold">Work Without Limits</h3>
                  <p className="text-muted-foreground">That's it! Your entire team can now work from anywhere, on any device, at the same time.</p>
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="https://placehold.co/450x405.png"
              data-ai-hint="workflow diagram"
              width="450"
              height="405"
              alt="Shared Service workflow"
              className="mx-auto rounded-xl object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Features List Section */}
       <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Everything You Need, All in One Place</h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Our Shared Service is packed with features to make your accounting process more efficient and secure.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <span>Supports Tally.ERP9, Tally Prime, Busy & more</span>
              </div>
               <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <span>Seamless local printing support</span>
              </div>
              <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <span>Multi-user collaborative access</span>
              </div>
              <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <span>Daily automated data backups</span>
              </div>
               <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <span>24/7 expert technical support</span>
              </div>
              <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <span>99% Uptime Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <span>Use your existing software license</span>
              </div>
               <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <span>Works on Windows, Mac, and Linux</span>
              </div>
          </div>
        </div>
       </section>

      {/* FAQ Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">Is my data secure on the Shared Service?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Absolutely. Security is our top priority. We use end-to-end encryption, robust firewalls, and isolated environments for each client. Your data is backed up daily and stored in our state-of-the-art data centers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Can I use my existing Tally or Busy license?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Yes, you can. You can use your existing license with our Shared Service without any issues. Our team will help you configure it during the setup process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">How do I access my software on the Shared Service?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                We provide two easy ways to connect: a downloadable RDP (Remote Desktop Protocol) file for the most feature-rich experience, or a secure web portal for quick access from any browser. Both options are simple to use.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">What happens if my local internet connection is slow?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Our platform is optimized to perform well even on standard internet connections. Since only screen updates are transmitted, not large data files, the experience remains smooth and responsive.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
    </div>
  );
}
