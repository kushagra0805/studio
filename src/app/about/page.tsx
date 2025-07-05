
"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Target, Globe, Eye, ShieldCheck, Lightbulb, HeartHandshake, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
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

  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
            About M A Global Network
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Pioneering the future of cloud infrastructure with a focus on reliability, performance, and customer success.
          </p>
        </motion.div>
      </div>

      <div className="relative py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="mt-2 text-muted-foreground">
                To empower businesses by providing robust, scalable, and secure cloud solutions that drive growth and innovation, making enterprise-level technology accessible to all.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent mx-auto mb-4">
                 <Eye className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
              <p className="mt-2 text-muted-foreground">
                To be the most trusted and customer-centric cloud service provider, known for our cutting-edge technology, exceptional support, and commitment to our clients' success.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Our Infrastructure</h2>
              <p className="mt-2 text-muted-foreground">
                Our global network of state-of-the-art data centers is built for high availability and low latency, ensuring your applications are always fast, secure, and online.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold tracking-tight mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                    Founded with the belief that powerful cloud technology should be accessible to everyone, M A Global Network began as a small team of passionate engineers. We saw a need for a hosting provider that wasn't just a vendor, but a true partner. 
                </p>
                <p className="text-muted-foreground">
                    From our origins in providing specialized accounting cloud services with Cloud-x.in, we've grown into a comprehensive infrastructure provider. Today, we serve thousands of clients worldwide, but our core mission remains the same: to deliver exceptional performance and unwavering support.
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                 <img
                  src="https://placehold.co/450x315.png"
                  width="450"
                  height="315"
                  alt="Our Journey"
                  data-ai-hint="journey path"
                  className="mx-auto rounded-xl object-cover"
                />
            </motion.div>
        </div>
      </div>
      
      <div className="py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold tracking-tight">Our Commitment to Excellence</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Our core values guide every decision we make and every interaction we have.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div variants={itemVariants} className="p-6 bg-background rounded-lg shadow-md text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">Uncompromising Reliability</h3>
                    <p className="mt-2 text-muted-foreground">We build our systems for 99% uptime, ensuring your services are always available when you need them most.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="p-6 bg-background rounded-lg shadow-md text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent mx-auto mb-4">
                        <Lightbulb className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">Continuous Innovation</h3>
                    <p className="mt-2 text-muted-foreground">We are constantly exploring new technologies to provide our clients with the fastest, most secure, and most efficient solutions.</p>
                </motion.div>
                 <motion.div variants={itemVariants} className="p-6 bg-background rounded-lg shadow-md text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                        <HeartHandshake className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">Customer-Centric Support</h3>
                    <p className="mt-2 text-muted-foreground">Your success is our success. Our expert team is dedicated to providing friendly, responsive, and effective support 24/7.</p>
                </motion.div>
            </motion.div>
          </div>
      </div>

       <div className="py-24">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight">Ready to Build the Future?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Explore our powerful solutions or get in touch with our team to discuss your project.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/products">
                                View Our Products <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                         <Button asChild size="lg" variant="secondary">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
       </div>

    </div>
  );
}
