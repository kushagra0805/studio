
"use client"

import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '../../components/ui/button';
import { ArrowRight, Server, Database, Globe, Building, BarChart, CloudCog, ShieldCheck, Zap, Cpu, Network, Layers } from 'lucide-react';
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

const floatingAnimation = (duration = 6, delay = 0) => ({
  y: [0, -25, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut",
    delay
  }
});

export default function ProductsPage() {
  const products = [
    {
      id: "vps",
      title: "Virtual Private Servers",
      icon: Server,
      desc: "Get the power of a dedicated server with the flexibility of cloud hosting. Our high-performance VPS solutions provide guaranteed resources and the ability to scale up as you grow instantly.",
      image: images.products.vps,
      features: ["Intel Xeon CPUs", "NVMe SSD Storage", "Dedicated Resources", "DDoS Protection"]
    },
    {
      id: "dedicated",
      title: "Dedicated Power",
      icon: Database,
      desc: "Ultimate performance for high-load applications. Raw physical hardware with no virtualization overhead. Dedicated entirely to your success with world-class reliability.",
      image: images.products.dedicated,
      features: ["Bare Metal Performance", "Custom Configs", "Isolated Hardware", "High Bandwidth"],
      reverse: true
    },
    {
      id: "shared-server",
      title: "Shared Server (Cloud-x.in)",
      icon: BarChart,
      desc: "Optimized accounting infrastructure for Tally, Busy, and more. Access your critical financial data from anywhere securely through our specialized cloud portal.",
      image: images.products.shared,
      features: ["RDP/Web Access", "Daily Backups", "Multi-user Support", "99% Uptime"]
    },
    {
      id: "web-hosting",
      title: "Web Hosting",
      icon: Globe,
      desc: "Fast, secure, and reliable hosting for your websites. From basic blogs to high-traffic e-commerce platforms, we provide the stability you need.",
      image: images.products.hosting,
      features: ["Free SSL Certificate", "One-Click Installs", "Unmetered Bandwidth", "Managed Security"],
      reverse: true
    },
    {
      id: "colocation",
      title: "Server Colocation",
      icon: Building,
      desc: "House your own hardware in our world-class facilities. Benefit from our redundant power, cooling, and extreme network connectivity.",
      image: images.products.colocation,
      features: ["High Reliability", "Redundant Power", "Biometric Security", "Remote Hands Support"]
    },
    {
      id: "on-premise-cloud",
      title: "On-premise Cloud",
      icon: CloudCog,
      desc: "The ultimate private cloud solution deployed at your location. Total control over your data with the expertise and management of M A Global Network.",
      image: images.products.onPremise,
      features: ["Data Sovereignty", "Custom Architecture", "Hybrid Connectivity", "Fully Managed Service"],
      reverse: true
    }
  ];

  return (
    <div className="bg-background pt-20">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl">
            Precision <span className="text-primary">Infrastructure</span>
          </h1>
          <p className="mt-8 max-w-4xl mx-auto text-xl md:text-3xl text-muted-foreground leading-relaxed font-medium">
            High-availability cloud solutions designed for mission-critical applications. Performance without limits, backed by a 99% Uptime Guarantee.
          </p>
        </motion.div>

        {products.map((product, idx) => (
          <section key={product.id} id={product.id} className={`py-24 scroll-mt-24 ${product.reverse ? 'bg-slate-50 dark:bg-slate-900/40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-24 rounded-[4rem]' : ''}`}>
            <div className={`grid md:grid-cols-2 gap-24 items-center`}>
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={product.reverse ? 'order-last md:order-last' : ''}
              >
                <div className="flex items-center gap-6 mb-8">
                  <motion.div 
                    animate={floatingAnimation(4, idx * 0.2)}
                    className="bg-primary/10 p-5 rounded-[1.5rem] text-primary shadow-inner"
                  >
                    <product.icon className="h-12 w-12" />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">{product.title}</h2>
                </div>
                <p className="text-muted-foreground text-2xl mb-10 leading-relaxed font-medium">
                  {product.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-12">
                   {product.features.map((feat, i) => (
                     <motion.div 
                        key={i} 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 font-bold text-lg"
                     >
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <Zap className="h-5 w-5 text-primary fill-primary" />
                        </div>
                        <span>{feat}</span>
                     </motion.div>
                   ))}
                </div>

                <Button asChild size="lg" className="rounded-full h-16 px-12 text-xl font-bold shadow-2xl shadow-primary/20">
                  <Link href="/pricing">View Pricing Plans <ArrowRight className="ml-2 h-6 w-6" /></Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: product.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className={product.reverse ? 'order-first md:order-first' : ''}
              >
                <motion.div 
                    animate={floatingAnimation(5 + (idx % 2), idx * 0.5)} 
                    className="relative"
                >
                    <div className="absolute -inset-10 bg-primary/20 rounded-[4rem] blur-[80px] opacity-30 -z-10" />
                    <NextImage 
                      width={product.image.width} 
                      height={product.image.height} 
                      src={product.image.url} 
                      alt={product.title} 
                      className="rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border-8 border-white dark:border-slate-800 object-cover w-full h-[450px] transition-transform duration-1000 hover:scale-105" 
                    />
                </motion.div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
