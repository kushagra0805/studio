
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Server, Database, Globe, BarChart, LifeBuoy, ShieldCheck, Scaling, Quote } from "lucide-react"
import { motion } from "framer-motion"

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

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[80vh] min-h-[500px] md:h-[calc(100vh-5rem)] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-background -z-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background z-0" />
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="https://picsum.photos/seed/cloudserver/1920/1080"
            alt="Abstract network background"
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint="abstract network"
          />
        </motion.div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.1 },
              },
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl 2xl:text-7xl text-primary"
            >
              M A Global Network
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl"
            >
              Powering Your Digital Future with Cutting-Edge, Reliable, and Secure Cloud Solutions.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="mt-8 flex flex-col gap-3 min-[400px]:flex-row justify-center"
            >
              <Button asChild size="lg">
                <Link href="/pricing" prefetch={false}>
                  View Pricing
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact" prefetch={false}>
                  Contact Sales
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section 
        id="why-us" 
        className="w-full py-12 md:py-24 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose M A Global Network?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are more than just a provider; we are your partner in innovation and growth.
                </p>
            </div>
          </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 mt-12">
              <motion.div 
                variants={itemVariants} 
                className="text-center flex flex-col items-center"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <LifeBuoy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">24/7 Expert Support</h3>
                <p className="text-muted-foreground mt-2">Our team is always available to help you with any issues.</p>
              </motion.div>
              <motion.div 
                variants={itemVariants} 
                className="text-center flex flex-col items-center"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Top-Tier Security</h3>
                <p className="text-muted-foreground mt-2">State-of-the-art security to protect your valuable data.</p>
              </motion.div>
              <motion.div 
                variants={itemVariants} 
                className="text-center flex flex-col items-center"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Scaling className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Scalable Solutions</h3>
                <p className="text-muted-foreground mt-2">Grow your infrastructure as your business expands.</p>
              </motion.div>
              <motion.div 
                variants={itemVariants} 
                className="text-center flex flex-col items-center"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Global Infrastructure</h3>
                <p className="text-muted-foreground mt-2">High-performance servers located across the world.</p>
              </motion.div>
            </div>
        </div>
      </motion.section>

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
            <Link href="/products#vps" className="block">
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="h-full bg-background/60 text-center shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Server className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Virtual Servers</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
            <Link href="/products#web-hosting" className="block">
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="h-full bg-background/60 text-center shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Web Hosting</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
            <Link href="/products#dedicated" className="block">
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="h-full bg-background/60 text-center shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Database className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Dedicated Servers</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
            <Link href="/cloud-x" className="block">
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="h-full bg-background/60 text-center shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <BarChart className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Shared Service</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  )
}
