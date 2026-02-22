
"use client"

import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { CheckCircle, Globe, Server, Zap } from "lucide-react";
import { motion } from "framer-motion";
import images from '../lib/placeholder-images.json';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function CloudXPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-secondary py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
           <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
           >
            <div className="inline-block rounded-lg bg-primary/10 px-4 py-2 mb-4">
                <h2 className="text-xl font-bold tracking-tighter text-primary">
                    Shared Server (Cloud-x.in)
                </h2>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
              Your Accounting, Unleashed on the Cloud
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
              Securely run Tally, Busy, and other accounting software from any device, anywhere in the world.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/order">Get Started Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Secure, and Ready in Minutes</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                <div>
                  <h3 className="font-semibold">We Migrate Your Data</h3>
                  <p className="text-muted-foreground">Our experts securely transfer your existing Tally/Busy data to your dedicated cloud instance.</p>
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <NextImage
              src={images.cloudX.workflow.url}
              data-ai-hint={images.cloudX.workflow.hint}
              width={images.cloudX.workflow.width}
              height={images.cloudX.workflow.height}
              alt="Shared Server workflow"
              className="mx-auto rounded-xl object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
