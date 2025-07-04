"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Users, Target, Globe } from "lucide-react";
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
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            About MA Global Network
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
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                 <Users className="h-8 w-8" />
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
    </div>
  );
}
