
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Server, Database, Globe, BarChart, LifeBuoy, ShieldCheck, Scaling, Zap, ArrowRight, CloudCog, Building, Cpu, Network } from "lucide-react"
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

const floatingAnimation = (duration = 4, delay = 0) => ({
  y: [0, -20, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut",
    delay
  }
});

const orbitAnimation = {
  rotate: 360,
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear"
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
            alt="M A Global Network Data Center Infrastructure"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
        </motion.div>

        {/* Orbiting Elements */}
        <motion.div animate={orbitAnimation} className="absolute inset-0 z-0 pointer-events-none opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-primary/20 rounded-full" />
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
              className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6 backdrop-blur-sm shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            >
              <Zap className="h-4 w-4 fill-primary" />
              <span>Next-Gen Cloud Infrastructure</span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50 drop-shadow-2xl"
            >
              M A Global Network
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[750px] mx-auto text-slate-300 md:text-xl lg:text-2xl leading-relaxed font-medium"
            >
              Providing reliable, scalable, and secure cloud solutions including VPS, Dedicated Servers, and Accounting Shared Servers with 99% Uptime.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 min-[400px]:flex-row justify-center"
            >
              <Button asChild size="lg" className="h-14 px-8 rounded-full shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/30 text-white bg-white/10 hover:bg-white hover:text-slate-950 transition-all backdrop-blur-md">
                <Link href="/contact">Request a Demo</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* More Floating Icons for Background Decoration */}
        <motion.div animate={floatingAnimation(5, 0)} className="absolute top-1/4 left-1/4 hidden lg:block opacity-20 text-primary">
          <Server size={80} />
        </motion.div>
        <motion.div animate={floatingAnimation(6, 1)} className="absolute bottom-1/4 right-1/4 hidden lg:block opacity-20 text-primary">
          <Database size={100} />
        </motion.div>
        <motion.div animate={floatingAnimation(7, 0.5)} className="absolute top-1/3 right-1/4 hidden lg:block opacity-10 text-primary">
          <Cpu size={60} />
        </motion.div>
        <motion.div animate={floatingAnimation(8, 2)} className="absolute bottom-1/3 left-1/4 hidden lg:block opacity-10 text-primary">
          <Network size={70} />
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Professional Hosting & Server Solutions</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
                Experience high-performance infrastructure built for mission-critical applications and 99% availability.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Virtual Servers", icon: Server, link: "/products#vps", desc: "High-performance VPS with instant scaling and guaranteed resources." },
              { title: "Dedicated Power", icon: Database, link: "/products#dedicated", desc: "Raw physical performance for enterprise-level workloads." },
              { title: "Shared Server", icon: BarChart, link: "/cloud-x", desc: "Optimized accounting infrastructure for Tally, Busy, and more." },
              { title: "Global Hosting", icon: Globe, link: "/products#web-hosting", desc: "Fast, secure, and reliable web hosting for global reach." },
              { title: "Colocation", icon: Building, link: "/products#colocation", desc: "Enterprise space for your own mission-critical hardware." },
              { title: "On-premise Cloud", icon: CloudCog, link: "/products#on-premise-cloud", desc: "Fully managed private cloud deployed at your location." }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Link href={service.link}>
                  <Card className="h-full border-none shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="flex flex-col items-center pt-10">
                      <motion.div 
                        animate={floatingAnimation(4 + (idx % 3), idx * 0.2)}
                        className="bg-primary/10 p-5 rounded-3xl mb-6 text-primary shadow-inner"
                      >
                        <service.icon className="h-10 w-10" />
                      </motion.div>
                      <CardTitle className="text-2xl font-black">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pb-10 px-8">
                      <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                      <div className="mt-6 text-primary font-bold inline-flex items-center gap-1 group">
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
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl mb-6 leading-tight">Reliable Infrastructure,<br />Unmatched Uptime</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                M A Global Network provides robust cloud infrastructure designed to protect your data and keep your business online 24/7 with a solid 99% uptime guarantee.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: LifeBuoy, text: "24/7 Expert Support", color: "bg-blue-500", iconColor: "text-blue-500" },
                  { icon: ShieldCheck, text: "Enterprise Security", color: "bg-green-500", iconColor: "text-green-500" },
                  { icon: Scaling, text: "Elastic Scalability", color: "bg-purple-500", iconColor: "text-purple-500" },
                  { icon: Zap, text: "99% Uptime Guarantee", color: "bg-amber-500", iconColor: "text-amber-500" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 transition-all"
                  >
                    <div className={`${item.iconColor} p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm`}>
                        <item.icon className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-lg">{item.text}</span>
                  </motion.div>
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
              <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] opacity-30 animate-pulse" />
              <motion.div
                animate={floatingAnimation(5, 0)}
                className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] border-8 border-white dark:border-slate-900"
              >
                <Image
                  src={images.cloudWorkflow.url}
                  width={images.cloudWorkflow.width}
                  height={images.cloudWorkflow.height}
                  alt="High-performance cloud server network topology"
                  className="object-cover transition-transform duration-1000 hover:scale-110"
                />
              </motion.div>
              <motion.div
                animate={floatingAnimation(4, 1)}
                className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700 hidden md:block"
              >
                <p className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-2">Network Status</p>
                <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full animate-ping" />
                    <p className="text-3xl font-black mt-1">99% UPTIME</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-white/10 rounded-full blur-[150px]" 
        />
        <div className="container px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Upgrade to Enterprise Cloud Today</h2>
            <p className="text-primary-foreground/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Join thousands of businesses that trust M A Global Network for mission-critical cloud hosting with guaranteed 99% availability.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild size="lg" variant="secondary" className="h-16 px-12 rounded-full text-xl font-bold shadow-2xl shadow-black/20 hover:scale-105 transition-transform">
                <Link href="/pricing">Explore Pricing</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-16 px-12 rounded-full text-xl font-bold border-white/40 bg-white/10 hover:bg-white text-white hover:text-primary transition-all backdrop-blur-md">
                <Link href="/contact">Speak to an Expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
