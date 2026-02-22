
"use client"

import Link from "next/link"
import NextImage from "next/image"
import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Server, Database, Globe, BarChart, LifeBuoy, ShieldCheck, Scaling, Zap, ArrowRight, CloudCog, Building } from "lucide-react"
import { motion } from "framer-motion"
import images from './lib/placeholder-images.json'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Optimized for SEO with H1 */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-slate-950 -z-20" />
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <NextImage
            src={images.heroBackground.url}
            alt="M A Global Network Data Center Infrastructure Background"
            fill
            className="object-cover"
            priority
            data-ai-hint={images.heroBackground.hint}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/20 to-slate-950/90" />
        </motion.div>

        <div className="container px-4 md:px-6 relative z-10 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6 backdrop-blur-sm"
            >
              <Zap className="h-4 w-4" />
              <span>Leading Enterprise Cloud Solutions</span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              M A Global Network
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[700px] mx-auto text-slate-300 md:text-xl lg:text-2xl leading-relaxed"
            >
              The power behind your digital transformation. High-performance VPS, Dedicated Servers, and Shared Server infrastructure with 99% Uptime.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 min-[400px]:flex-row justify-center"
            >
              <Button asChild size="lg" className="h-14 px-8 rounded-full shadow-xl">
                <Link href="/pricing">Explore Pricing</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/30 text-white hover:bg-white hover:text-slate-950 transition-all">
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Optimized with H2 and H3 */}
      <section id="services" className="w-full py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Core Infrastructure Services</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
                Scalable, reliable, and secure hosting solutions designed for modern enterprise requirements.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Virtual Private Servers", icon: Server, link: "/products#vps", desc: "Elastic compute resources with NVMe storage and instant deployment." },
              { title: "Dedicated Hardware", icon: Database, link: "/products#dedicated", desc: "Maximum performance bare-metal servers for intensive workloads." },
              { title: "Accounting Shared Server", icon: BarChart, link: "/cloud-x", desc: "Specialized infrastructure for Tally, Busy, and enterprise accounting." },
              { title: "Global Web Hosting", icon: Globe, link: "/products#web-hosting", desc: "Optimized web hosting with high-availability and managed security." },
              { title: "Secure Colocation", icon: Building, link: "/products#colocation", desc: "World-class data center space for your mission-critical hardware." },
              { title: "On-premise Cloud", icon: CloudCog, link: "/products#on-premise-cloud", desc: "Bespoke private cloud deployments managed at your location." }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={service.link}>
                  <Card className="h-full border-none shadow-md hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 rounded-3xl group">
                    <CardHeader className="flex flex-col items-center pt-10">
                      <div className="bg-primary/10 p-4 rounded-2xl mb-4 text-primary group-hover:scale-110 transition-transform">
                        <service.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pb-10 px-8">
                      <p className="text-muted-foreground">{service.desc}</p>
                      <div className="mt-6 text-primary font-semibold inline-flex items-center gap-1">
                        Learn More <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="w-full py-24 md:py-32 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Why Visionaries Trust M A Global Network</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We don't just provide servers; we provide the foundation for your business growth. Our infrastructure is built for reliability, scale, and speed.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: LifeBuoy, text: "24/7 Expert Support" },
                  { icon: ShieldCheck, text: "Enterprise Security" },
                  { icon: Scaling, text: "Scalable Solutions" },
                  { icon: Zap, text: "99% Uptime SLA" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="text-primary"><item.icon className="h-6 w-6" /></div>
                    <span className="font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[80px] -z-10" />
              <NextImage
                src={images.cloudWorkflow.url}
                width={images.cloudWorkflow.width}
                height={images.cloudWorkflow.height}
                alt="Cloud Infrastructure Workflow and Uptime Monitoring"
                className="rounded-3xl shadow-2xl object-cover"
                data-ai-hint={images.cloudWorkflow.hint}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
