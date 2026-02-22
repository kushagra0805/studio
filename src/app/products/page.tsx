
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { ArrowRight, Server, Database, Globe, Building, BarChart, CloudCog, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import images from '../lib/placeholder-images.json';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function ProductsPage() {
  return (
    <div className="bg-background pt-20">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Precision <span className="text-primary">Infrastructure</span>
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed">
            High-availability cloud solutions designed for mission-critical applications. Performance without limits.
          </p>
        </motion.div>

        {/* Product Sections */}
        {[
          {
            id: "vps",
            title: "Virtual Private Servers",
            icon: Server,
            desc: "Get the power of a dedicated server with the flexibility of cloud hosting. Our high-performance VPS solutions give you full root access, guaranteed resources, and the ability to scale up as you grow instantly.",
            image: images.vpsImage,
            features: ["Intel Xeon CPUs", "NVMe SSD Storage", "Full Root Access", "DDoS Protection"]
          },
          {
            id: "dedicated",
            title: "Dedicated Power",
            icon: Database,
            desc: "Ultimate performance for high-load applications. Raw physical hardware with no virtualization overhead. Dedicated entirely to your success.",
            image: images.dedicatedImage,
            features: ["Bare Metal Performance", "Custom Configs", "Isolated Hardware", "High Bandwidth"],
            reverse: true
          },
          {
            id: "shared-service",
            title: "Shared Service (Cloud-x.in)",
            icon: BarChart,
            desc: "Optimized accounting infrastructure for Tally, Busy, and more. Access your critical financial data from anywhere securely.",
            image: images.sharedServiceImage,
            features: ["RDP/Web Access", "Daily Backups", "Multi-user Support", "99.9% Uptime"]
          }
        ].map((product, idx) => (
          <section key={product.id} id={product.id} className={`py-20 scroll-mt-24 ${product.reverse ? 'bg-slate-50 dark:bg-slate-900/40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-20 rounded-[3rem]' : ''}`}>
            <div className={`grid md:grid-cols-2 gap-20 items-center overflow-visible`}>
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={product.reverse ? 'order-last md:order-last' : ''}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <product.icon className="h-10 w-10" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{product.title}</h2>
                </div>
                <p className="text-muted-foreground text-xl mb-8 leading-relaxed">
                  {product.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-10">
                   {product.features.map((feat, i) => (
                     <div key={i} className="flex items-center gap-2 font-semibold">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>{feat}</span>
                     </div>
                   ))}
                </div>

                <Button asChild size="lg" className="rounded-full h-14 px-10">
                  <Link href="/pricing">View Pricing Plans <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: product.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className={product.reverse ? 'order-first md:order-first' : ''}
              >
                <motion.div animate={floatingAnimation} className="relative">
                    <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-30 -z-10" />
                    <Image 
                      width={product.image.width} 
                      height={product.image.height} 
                      src={product.image.url} 
                      alt={product.title} 
                      className="rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-slate-800 object-cover w-full h-[400px]" 
                    />
                </motion.div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* Global Network Section */}
        <section className="py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Deploy Anywhere. Scale Everywhere.</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
                Our global network presence ensures your users get the fastest experience possible, regardless of their location.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                <div className="p-8 rounded-3xl bg-secondary/50 backdrop-blur-sm border">
                    <Globe className="h-12 w-12 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-2">12+ Regions</h3>
                    <p className="text-muted-foreground">Strategic nodes worldwide.</p>
                </div>
                <div className="p-8 rounded-3xl bg-secondary/50 backdrop-blur-sm border">
                    <ShieldCheck className="h-12 w-12 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-2">99.9% SLAs</h3>
                    <p className="text-muted-foreground">Enterprise uptime commitment.</p>
                </div>
                <div className="p-8 rounded-3xl bg-secondary/50 backdrop-blur-sm border">
                    <Cpu className="h-12 w-12 text-purple-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-2">NVMe Speed</h3>
                    <p className="text-muted-foreground">Ultra-fast storage technology.</p>
                </div>
              </div>
            </motion.div>
        </section>
      </div>
    </div>
  );
}
