"use client"

import { Building2, Lightbulb, TrendingUp, Users, HeartHandshake, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";

const perks = [
  {
    icon: Lightbulb,
    title: "Innovative Projects",
    description: "Work on cutting-edge cloud technology and solve real-world problems for a diverse client base."
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "We invest in our people. Get access to training, certifications, and clear paths for advancement."
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Join a supportive team of passionate experts who value teamwork and knowledge sharing."
  },
  {
    icon: HeartHandshake,
    title: "Work-Life Balance",
    description: "We believe in a healthy balance. Enjoy flexible work arrangements and a positive environment."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};


export default function CareerPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex justify-center items-center mb-6">
              <Building2 className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Build Your Future at M A Global Network
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
            We're a team of innovators and problem-solvers dedicated to building the future of cloud infrastructure. Join us and make an impact.
          </p>
        </motion.div>
      </div>

      {/* Perks Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
           <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold tracking-tight">Why Work With Us?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We're not just a company; we're a community. We're committed to creating an environment where you can thrive.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {perks.map((perk, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        <perk.icon className="h-8 w-8" />
                      </div>
                      <CardTitle>{perk.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{perk.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight">Current Openings</h2>
          <Card className="mt-8 text-center">
            <CardContent className="pt-6">
                <p className="text-lg text-muted-foreground">There are no open positions at this time.</p>
                <p className="mt-2 text-muted-foreground">We are always looking for talented individuals. Please feel free to send your resume to <a href="mailto:info@cloud-x.in" className="text-primary font-semibold hover:underline">info@cloud-x.in</a> and we will keep it on file for future opportunities.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* How to reach us & Contact form CTA */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={itemVariants}
            >
                <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3"><MapPin className="h-8 w-8 text-primary" /> How To Reach Us</h2>
                <p className="text-muted-foreground mb-4 text-lg">
                    Our office is centrally located and accessible. We'd love to meet you.
                </p>
                <div className="space-y-2 text-foreground">
                    <p className="font-semibold">M A Global Network</p>
                    <p>123 Cloud Avenue, Tech Park</p>
                    <p>Indore, Madhya Pradesh, 452001</p>
                    <p>India</p>
                </div>
            </motion.div>
            <motion.div
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.5 }}
                 variants={itemVariants}
            >
                 <Card>
                    <CardHeader>
                        <CardTitle>Have Questions?</CardTitle>
                        <CardContent className="pt-4 px-0 pb-0">
                             <p className="text-muted-foreground mb-6">
                                If you have any questions about careers or opportunities at M A Global Network, don't hesitate to get in touch with our HR team.
                            </p>
                             <Button asChild size="lg">
                                <Link href="/contact">
                                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </CardHeader>
                </Card>
            </motion.div>
        </div>
      </section>

    </div>
  );
}
