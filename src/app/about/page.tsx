
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Target, Globe, Eye, ShieldCheck, Lightbulb, HeartHandshake, ArrowRight, Award, History, Users } from "lucide-react";
import { motion } from "framer-motion";
import images from '../lib/placeholder-images.json';

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                Established Since 2012
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-primary">
              The Cloud Vision
            </h1>
            <p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Pioneering the future of cloud infrastructure with a focus on reliability, extreme performance, and customer success.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* CEO & Founder Section - Highlighted */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
              <motion.div 
                animate={floatingAnimation}
                className="relative"
              >
                <div className="absolute -inset-10 bg-primary/30 rounded-full blur-[100px] opacity-20" />
                <Image
                  src={images.ceoPortrait.url}
                  width={images.ceoPortrait.width}
                  height={images.ceoPortrait.height}
                  alt="Mr. Manish Agrawal"
                  className="rounded-3xl shadow-2xl object-cover grayscale hover:grayscale-0 transition-all duration-700 w-full max-w-[450px] mx-auto border-4 border-white/10"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-2xl shadow-2xl hidden lg:block">
                  <Award className="h-10 w-10 text-white" />
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-6 block">Our Leadership</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Mr. Manish Agrawal</h2>
              <p className="text-2xl text-slate-400 mb-10 italic leading-relaxed">
                "We don't just provide hosting; we build the engine for digital transformation. Our mission is to make enterprise-grade technology accessible to every visionary."
              </p>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  As the Founder and CEO of M A Global Network, Manish Agrawal brings over 15 years of deep expertise in network architecture and high-scale computing.
                </p>
                <p>
                  Under his visionary leadership, the company has transformed from a niche hosting provider into a multi-national infrastructure powerhouse, serving thousands of businesses with cutting-edge cloud solutions.
                </p>
              </div>
              <div className="mt-12">
                 <Button asChild size="lg" className="rounded-full h-14 px-10">
                   <Link href="/contact">Connect With Our Team</Link>
                 </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y bg-slate-50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "10,000+", icon: Users },
              { label: "Data Centers", value: "12+", icon: Globe },
              { label: "Uptime", value: "99.99%", icon: ShieldCheck },
              { label: "Years Experience", value: "12+", icon: History }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-4xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={itemVariants} className="group p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-500/10 text-blue-500 mb-8 transition-transform group-hover:scale-110">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Empowering businesses by providing robust, scalable, and secure cloud solutions that drive growth and innovation at every level.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="group p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-purple-500/10 text-purple-500 mb-8 transition-transform group-hover:scale-110">
                 <Eye className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To be the world's most trusted cloud provider, known for our uncompromising performance and obsessively client-focused support.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="group p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-green-500/10 text-green-500 mb-8 transition-transform group-hover:scale-110">
                <Globe className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Global Reach</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Expanding our network of Tier-4 data centers across continents to deliver low-latency services to users everywhere.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold tracking-tight mb-8">Our Journey to the Cloud</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Started in 2012 by Manish Agrawal, M A Global Network began as a solution to the complex hurdles businesses faced when moving to the web. 
                  </p>
                  <p>
                    From our initial specialized services with Cloud-x.in to our current massive infrastructure footprint, we've never lost sight of our goal: delivering enterprise-grade power with human-level support.
                  </p>
                </div>
                <div className="mt-10">
                   <Button asChild variant="outline" size="lg" className="rounded-full">
                     <Link href="/career">Join Our Growing Team</Link>
                   </Button>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                 <Image
                  src={images.ourStory.url}
                  width={images.ourStory.width}
                  height={images.ourStory.height}
                  alt="Our Journey"
                  className="mx-auto rounded-3xl object-cover shadow-2xl border-4 border-white dark:border-slate-800"
                />
                {/* Floating graphic */}
                <motion.div 
                  animate={floatingAnimation}
                  className="absolute -top-10 -right-10 bg-primary/20 p-8 rounded-full blur-3xl -z-10"
                />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
