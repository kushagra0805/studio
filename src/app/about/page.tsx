
"use client"

import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Target, Globe, Eye, ShieldCheck, Lightbulb, HeartHandshake, ArrowRight, Award, History, Server, Zap } from "lucide-react";
import { motion } from "framer-motion";
import images from '../lib/placeholder-images.json';

const floatingAnimation = (duration = 5, delay = 0) => ({
  y: [0, -15, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut",
    delay
  }
});

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
      <section className="relative py-24 md:py-32 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div 
                animate={floatingAnimation(4)}
                className="inline-block rounded-full bg-primary/10 px-6 py-2 text-sm font-bold text-primary mb-8 border border-primary/20 backdrop-blur-sm"
            >
                ESTABLISHED SINCE 2012
            </motion.div>
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl text-primary drop-shadow-sm">
              The Cloud Vision
            </h1>
            <p className="mt-8 max-w-4xl mx-auto text-xl md:text-3xl text-muted-foreground leading-relaxed font-medium">
              Pioneering the future of cloud infrastructure with a focus on reliability, extreme performance, and customer success.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </section>

      {/* CEO & Founder Section */}
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
                animate={floatingAnimation(6)}
                className="relative"
              >
                <div className="absolute -inset-10 bg-primary/30 rounded-full blur-[100px] opacity-20 animate-pulse" />
                <NextImage
                  src={images.about.ceo.url}
                  width={images.about.ceo.width}
                  height={images.about.ceo.height}
                  alt="Mr. Manish Agrawal"
                  className="rounded-[3rem] shadow-2xl object-cover grayscale hover:grayscale-0 transition-all duration-1000 w-full max-w-[450px] mx-auto border-8 border-white/10"
                />
                <motion.div 
                    animate={floatingAnimation(4, 1)}
                    className="absolute -bottom-8 -left-8 bg-primary p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(var(--primary),0.5)] hidden lg:block border-4 border-white/10"
                >
                  <Award className="h-12 w-12 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-black tracking-[0.4em] uppercase text-sm mb-8 block">Our Leadership</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-10">Mr. Manish Agrawal</h2>
              <p className="text-2xl md:text-3xl text-slate-400 mb-12 italic leading-relaxed font-medium">
                "We don't just provide hosting; we build the engine for digital transformation. Our mission is to make enterprise-grade technology accessible to every visionary."
              </p>
              <div className="space-y-8 text-slate-300 text-xl leading-relaxed">
                <p>
                  As the Founder and CEO of M A Global Network, Manish Agrawal brings over 15 years of deep expertise in network architecture and high-scale computing.
                </p>
                <p>
                  Under his visionary leadership, the company has transformed into a multi-national infrastructure powerhouse, serving thousands of businesses with cutting-edge cloud solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-5xl font-black tracking-tight mb-10">Our Journey to the Cloud</h2>
                <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                  <p>
                    Started in 2012 by Manish Agrawal, M A Global Network began as a solution to the complex hurdles businesses faced when moving to the web. 
                  </p>
                  <p>
                    From our initial specialized services with Cloud-x.in to our current massive infrastructure footprint, we've never lost sight of our goal: delivering enterprise-grade power with human-level support.
                  </p>
                </div>
                <div className="mt-12">
                   <Button asChild size="lg" className="rounded-full h-16 px-10 text-xl font-bold shadow-2xl shadow-primary/20">
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
                 <motion.div 
                    animate={floatingAnimation(7)}
                    className="relative"
                 >
                    <NextImage
                        src={images.about.story.url}
                        width={images.about.story.width}
                        height={images.about.story.height}
                        alt="Our Journey"
                        className="mx-auto rounded-[3.5rem] object-cover shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-8 border-white dark:border-slate-800"
                    />
                    <motion.div 
                        animate={floatingAnimation(5, 1)}
                        className="absolute -top-12 -right-12 bg-primary/20 p-12 rounded-full blur-[60px] -z-10"
                    />
                 </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
