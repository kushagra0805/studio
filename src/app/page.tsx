"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Server, Database, Globe, Shield, Zap, Cloud, BarChart } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
              <motion.div 
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                    MA Global Network
                  </h1>
                   <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Powering Your Digital Future with Cutting-Edge Cloud Solutions.
                  </p>
                  <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    We provide scalable, secure, and reliable cloud infrastructure including VMs, dedicated servers, colocation, and web hosting to fuel your growth.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/pricing" prefetch={false}>
                      View Pricing
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/contact" prefetch={false}>
                      Contact Sales
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src="https://placehold.co/600x400.png"
                  width="600"
                  height="400"
                  alt="Cloud Infrastructure"
                  data-ai-hint="abstract network"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section 
          id="services" 
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Built For Performance</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our comprehensive suite of cloud services designed for reliability and scale.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 mt-12">
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="h-full bg-background/60 text-center shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center">
                     <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Server className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Virtual Servers</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
               <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
               >
                <Card className="h-full bg-background/60 text-center shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center">
                     <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Web Hosting</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
               <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
               >
                <Card className="h-full bg-background/60 text-center shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center">
                     <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Database className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Dedicated Servers</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
               <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
               >
                <Card className="h-full bg-background/60 text-center shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center">
                     <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <BarChart className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Accounting Cloud</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section id="cloud-x" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">Cloud-x.in</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Run Your Accounting on the Cloud with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">Cloud-x.in</span>
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Cloud-x.in is our specialized cloud platform designed for accounting applications like Tally and Busy. Enjoy secure, reliable access to your financial data from anywhere, with performance you can count on.
              </p>
              <Button asChild>
                <Link href="/products#cloud-x" prefetch={false}>
                  Learn More about Cloud-x.in <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <img
                src="https://placehold.co/550x310.png"
                width="550"
                height="310"
                alt="Cloud-x.in for Accounting"
                data-ai-hint="financial dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
