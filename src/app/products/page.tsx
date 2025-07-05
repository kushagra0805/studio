"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { ArrowRight, Server, Database, Globe, Building, BarChart, CloudCog } from 'lucide-react';
import { motion } from 'framer-motion';

const textFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const imageFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const textFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const imageFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

export default function ProductsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Our Cloud Solutions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Infrastructure built for performance, reliability, and scale. Find the perfect fit for your needs.
          </p>
        </motion.div>

        {/* Virtual Private Servers */}
        <div id="vps" className="mt-20 scroll-mt-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
          <motion.div
            variants={textFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Server className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Virtual Private Servers (VPS)</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-4">
              Get the power of a dedicated server with the flexibility of cloud hosting. Our high-performance VPS solutions give you full root access, guaranteed resources, and the ability to scale up as you grow. Perfect for web applications, development environments, and small business servers.
            </p>
            <Button asChild>
              <Link href="/pricing#vps">Explore VPS Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
          <motion.div
            variants={imageFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image width="530" height="340" src="https://placehold.co/530x340.png" data-ai-hint="server racks" alt="Virtual Private Servers" className="rounded-lg shadow-md" />
          </motion.div>
        </div>

        {/* Dedicated Servers */}
        <div id="dedicated" className="mt-24 scroll-mt-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
          <motion.div 
            className="order-last md:order-first"
            variants={imageFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
             <Image width="530" height="340" src="https://placehold.co/530x340.png" data-ai-hint="dedicated server" alt="Dedicated Servers" className="rounded-lg shadow-md" />
          </motion.div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Database className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Dedicated Servers</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-4">
              For ultimate performance and security, nothing beats a dedicated server. You get an entire physical server dedicated to your applications, with no noisy neighbors. Ideal for high-traffic websites, large databases, and enterprise applications.
            </p>
             <Button asChild>
              <Link href="/pricing#dedicated">Explore Dedicated Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Accounting on Cloud */}
        <div id="shared-service" className="mt-24 scroll-mt-20 pt-10 grid md:grid-cols-2 gap-12 items-center bg-secondary -mx-4 sm:-mx-6 lg:-mx-8 p-4 sm:p-6 lg:p-12 rounded-lg overflow-hidden">
          <motion.div
            variants={textFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <BarChart className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Shared Service (Cloud-x.in)</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-4">
              Move your essential accounting software like Tally, Busy, and others to the cloud with our specialized Shared Service platform. Access your financial data securely from any device, anywhere, without the hassle of managing local servers.
            </p>
            <Button asChild>
              <Link href="/cloud-x">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
          <motion.div
             variants={imageFromRight}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.3 }}
          >
            <Image width="530" height="340" src="https://placehold.co/530x340.png" data-ai-hint="accounting software" alt="Accounting on the Cloud" className="rounded-lg shadow-md" />
          </motion.div>
        </div>

        {/* Web Hosting */}
        <div id="web-hosting" className="mt-24 scroll-mt-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
           <motion.div 
            className="order-last md:order-first"
            variants={imageFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
           >
             <Image width="530" height="340" src="https://placehold.co/530x340.png" data-ai-hint="website interface" alt="Web Hosting" className="rounded-lg shadow-md" />
          </motion.div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Globe className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Web Hosting</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-4">
             Fast, reliable, and secure hosting for your websites. From personal blogs to large e-commerce stores, our web hosting plans are designed for speed and come with everything you need to get online, backed by our 24/7 expert support.
            </p>
             <Button asChild>
              <Link href="/pricing#web-hosting">Explore Hosting Pricing<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>

        {/* Server Colocation */}
        <div id="colocation" className="mt-24 scroll-mt-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
          <motion.div
            variants={textFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Building className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Server Colocation</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-4">
              House your own server hardware in our world-class data centers. We provide the secure space, power, cooling, and network connectivity, so you can benefit from our enterprise-grade infrastructure without the high cost of building your own.
            </p>
             <Button asChild>
              <Link href="/pricing#colocation">Contact for Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
          <motion.div
            variants={imageFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image width="530" height="340" src="https://placehold.co/530x340.png" data-ai-hint="data center" alt="Server Colocation" className="rounded-lg shadow-md" />
          </motion.div>
        </div>
        
        {/* On-premise Cloud */}
        <div id="on-premise-cloud" className="mt-24 scroll-mt-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
           <motion.div 
            className="order-last md:order-first"
            variants={imageFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
           >
             <Image width="530" height="340" src="https://placehold.co/530x340.png" data-ai-hint="private cloud" alt="On-premise Cloud" className="rounded-lg shadow-md" />
          </motion.div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <CloudCog className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">On-premise Cloud</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-4">
              Take full control of your infrastructure with a dedicated, on-premises cloud solution built exclusively for your business. We design and deploy a private cloud environment right at your location, tailored to your unique security, performance, and compliance requirements.
            </p>
             <Button asChild>
              <Link href="/pricing#on-premise-cloud">Design Your Cloud <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
