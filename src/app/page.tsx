
"use client"

import Link from "next/link"
import Image from "next/image"
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

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-slate-950 -z-20" />
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src={images.heroBackground.url}
            alt="Global Cloud Network"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
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
              <Zap className="h-4 w-4 fill-primary" />
              <span>Next-Gen Infrastructure Solutions</span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50"
            >
              M A Global Network
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[750px] mx-auto text-slate-300 md:text-xl lg:text-2xl leading-relaxed"
            >
              Empowering businesses worldwide with reliable, scalable, and ultra-secure enterprise-grade cloud infrastructure.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 min-[400px]:flex-row justify-center"
            >
              <Button asChild size="lg" className="h-14 px-8 rounded-full shadow-xl shadow-primary/20">
                <Link href="/pricing">Explore Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white text-white bg-white/10 hover:bg-white hover:text-slate-950 transition-all">
                <Link href="/contact">Request a Demo</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Icons for Background Decoration */}
        <motion.div animate={floatingAnimation} className="absolute top-1/4 left-1/4 hidden lg:block opacity-20 text-primary">
          <Server size={80} />
        </motion.div>
        <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }} className="absolute bottom-1/4 right-1/4 hidden lg:block opacity-20 text-primary">
          <Database size={100} />
        </motion.div>
      </section>

      {/* Services Grid */}
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Engineered for Excellence</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
                Discover our specialized hosting and server solutions built on a foundation of performance and 99% uptime.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Virtual Servers", icon: Server, link: "/products#vps", desc: "High-performance VPS with instant scaling." },
              { title: "Dedicated Power", icon: Database, link: "/products#dedicated", desc: "Raw physical performance for enterprise." },
              { title: "Shared Server", icon: BarChart, link: "/cloud-x", desc: "Accounting solutions optimized for cloud-x.in." },
              { title: "Global Hosting", icon: Globe, link: "/products#web-hosting", desc: "Secure and fast hosting for websites." },
              { title: "Colocation", icon: Building, link: "/products#colocation", desc: "Reliable space for your mission-critical hardware." },
              { title: "On-premise Cloud", icon: CloudCog, link: "/products#on-premise-cloud", desc: "Private cloud solutions at your location." }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={service.link}>
                  <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800">
                    <CardHeader className="flex flex-col items-center pt-10">
                      <div className="bg-primary/10 p-5 rounded-3xl mb-6 text-primary">
                        <service.icon className="h-10 w-10" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pb-10">
                      <p className="text-muted-foreground">{service.desc}</p>
                      <div className="mt-4 text-primary font-semibold inline-flex items-center gap-1 group">
                        Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Unrivaled Infrastructure,<br />Unmatched Reliability</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At M A Global Network, we don't just host your data; we protect your digital legacy. Our high-availability data centers and redundant network paths ensure your business stays online 24/7/365.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: LifeBuoy, text: "24/7 Expert Support", color: "text-blue-500" },
                  { icon: ShieldCheck, text: "Enterprise Security", color: "text-green-500" },
                  { icon: Scaling, text: "Elastic Scalability", color: "text-purple-500" },
                  { icon: Zap, text: "99% Uptime Guarantee", color: "text-amber-500" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm">
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                    <span className="font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900">
                <Image
                  src={images.cloudWorkflow.url}
                  width={images.cloudWorkflow.width}
                  height={images.cloudWorkflow.height}
                  alt="Cloud Infrastructure"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <motion.div
                animate={floatingAnimation}
                className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl border hidden md:block"
              >
                <p className="text-sm font-bold text-primary uppercase tracking-widest">Global Status</p>
                <p className="text-2xl font-black mt-1">99% UPTIME</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="container px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to upgrade your infrastructure?</h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses that trust M A Global Network for their mission-critical applications with guaranteed 99% availability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="h-14 px-10 rounded-full text-lg shadow-xl shadow-black/10">
                <Link href="/pricing">View All Pricing</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg border-white bg-white/10 hover:bg-white text-white hover:text-primary transition-all">
                <Link href="/contact">Speak to an Expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
