
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Server, Database, Globe, BarChart, LifeBuoy, ShieldCheck, Scaling, Quote } from "lucide-react"
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

  const testimonials = [
    {
      quote: "M A Global Network's VPS is incredibly fast and reliable. Their 24/7 support team is a lifesaver, always responsive and knowledgeable. We migrated our entire infrastructure and haven't looked back.",
      name: "Rohan Sharma",
      company: "Tech Solutions Inc.",
    },
    {
      quote: "The Shared Service for Tally has transformed our accounting workflow. Accessing our data from anywhere is a game-changer for our distributed team. The setup was seamless and performance is excellent.",
      name: "Priya Patel",
      company: "Growth Ventures",
    },
    {
      quote: "We chose their colocation service for the top-tier security and robust infrastructure. The peace of mind knowing our hardware is in a world-class data center is invaluable. Highly recommended.",
      name: "Ankit Desai",
      company: "DataSecure Ltd.",
    },
  ];

  return (
    <>
      <section className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-secondary -z-10"></div>
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-20"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-20"></div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24 items-center">
            <motion.div 
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl text-primary whitespace-nowrap">
                  M A Global Network
                </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Powering Your Digital Future with Cutting-Edge, Reliable, and Secure Cloud Solutions.
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                  We specialize in providing scalable and secure cloud infrastructure including high-performance VMs, dedicated servers, enterprise-grade colocation, and robust web hosting. Our mission is to fuel your growth with technology you can trust.
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
              <Image
                src="https://placehold.co/550x400.png"
                data-ai-hint="cloud infrastructure"
                width="550"
                height="400"
                alt="Cloud Infrastructure"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                priority
              />
            </motion.div>
          </div>
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
              <motion.div variants={itemVariants} className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <LifeBuoy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">24/7 Expert Support</h3>
                <p className="text-muted-foreground mt-2">Our team is always available to help you with any issues.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Top-Tier Security</h3>
                <p className="text-muted-foreground mt-2">State-of-the-art security to protect your valuable data.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Scaling className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Scalable Solutions</h3>
                <p className="text-muted-foreground mt-2">Grow your infrastructure as your business expands.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center flex flex-col items-center">
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

      <section 
        id="testimonials" 
        className="w-full py-12 md:py-24 lg:py-32"
      >
        <motion.div 
          className="container px-4 md:px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Businesses Like Yours</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Read what our clients have to say about our services and support.
                </p>
            </div>
          </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {testimonials.map((testimonial, index) => (
                <motion.div variants={itemVariants} key={index}>
                  <Card className="h-full bg-secondary/60 shadow-sm">
                      <CardContent className="pt-6">
                          <Quote className="h-8 w-8 text-primary mb-4" />
                          <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
        </motion.div>
      </section>
    </>
  )
}
