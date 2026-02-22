
"use client"

import { Building2, Lightbulb, TrendingUp, Users, HeartHandshake, MapPin, ArrowRight, Mail, Phone, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import Image from "next/image";

const perks = [
  {
    icon: Lightbulb,
    title: "Innovative Projects",
    description: "Work on cutting-edge cloud technology and solve real-world problems for a diverse global client base."
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "We invest in our people. Get access to training, certifications, and clear paths for professional advancement."
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Join a supportive team of passionate experts who value teamwork, diversity, and knowledge sharing."
  },
  {
    icon: HeartHandshake,
    title: "Work-Life Balance",
    description: "We believe in a healthy balance. Enjoy flexible work arrangements and a positive, results-driven environment."
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
      <section className="relative py-24 md:py-32 overflow-hidden border-b">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6">
                <Briefcase className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build the Future of <span className="text-primary">Cloud</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Join M A Global Network and be part of a team that's redefining infrastructure. We're looking for thinkers, builders, and dreamers.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
               <Button asChild size="lg" className="rounded-full shadow-lg">
                  <a href="#openings">View Open Roles</a>
               </Button>
               <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/about">Learn Our Story</Link>
               </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
           <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Life at M A Global Network</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We're committed to creating an environment where every individual can thrive both personally and professionally.
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
                  <Card className="h-full border-none shadow-none bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4 shadow-md">
                        <perk.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{perk.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{perk.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* Reach Us Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
                <MapPin className="h-8 w-8 text-primary" /> How To Reach Us
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our main office is located in the heart of Tech Park, easily accessible via public transport. We'd love to host you for a coffee and discuss your future.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg"><Building2 className="text-primary h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold">M A Global Network HQ</h4>
                    <p className="text-muted-foreground">123 Cloud Avenue, Tech Park<br />Indore, MP, 452001, India</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg"><Mail className="text-primary h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold">Email Us</h4>
                    <p className="text-muted-foreground">careers@cloud-x.in</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg"><Phone className="text-primary h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold">Call Us</h4>
                    <p className="text-muted-foreground">+91 70240 58800</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border"
            >
               <Image 
                src="https://picsum.photos/seed/office/800/600" 
                width={800}
                height={600}
                alt="Our Office" 
                className="object-cover"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight">Open Opportunities</h2>
          <div className="mt-12 space-y-4">
             <Card className="border-dashed border-2 bg-transparent">
                <CardContent className="py-12">
                   <p className="text-xl font-medium">Currently, our team is full!</p>
                   <p className="mt-2 text-muted-foreground">But we're always scouting for talent. Send your portfolio or CV to us and we'll reach out when a spot opens up.</p>
                   <div className="mt-8">
                      <Button asChild size="lg" className="rounded-full px-10">
                         <Link href="/contact">Send Your Resume <ArrowRight className="ml-2 h-5 w-5" /></Link>
                      </Button>
                   </div>
                </CardContent>
             </Card>
          </div>
        </motion.div>
      </section>

      {/* Footer Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
           >
            <h2 className="text-3xl font-bold mb-4">Didn't find what you were looking for?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              If you have any questions about our hiring process or working at M A Global Network, our HR team is happy to help.
            </p>
            <Button asChild variant="secondary" size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
              <Link href="/contact">Get in Touch</Link>
            </Button>
           </motion.div>
        </div>
      </section>
    </div>
  );
}
