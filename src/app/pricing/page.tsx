
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Server, Globe, Database, Building, Cpu, MemoryStick, HardDrive, ShieldCheck, Zap, Network, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const vpsPlans = [
  {
    name: "VPS Starter",
    price: "$20",
    description: "Ideal for development and small applications.",
    features: [
      { icon: Cpu, text: "2 vCPU Cores" },
      { icon: MemoryStick, text: "4 GB RAM" },
      { icon: HardDrive, text: "80 GB NVMe SSD" },
      { icon: Globe, text: "2 TB Bandwidth" },
    ],
    popular: false,
  },
  {
    name: "VPS Business",
    price: "$40",
    description: "Perfect for growing websites and applications.",
    features: [
      { icon: Cpu, text: "4 vCPU Cores" },
      { icon: MemoryStick, text: "8 GB RAM" },
      { icon: HardDrive, text: "160 GB NVMe SSD" },
      { icon: Globe, text: "4 TB Bandwidth" },
      { icon: Check, text: "Daily Backups" },
    ],
    popular: true,
  },
  {
    name: "VPS Pro",
    price: "$80",
    description: "For demanding applications and high traffic.",
    features: [
      { icon: Cpu, text: "8 vCPU Cores" },
      { icon: MemoryStick, text: "16 GB RAM" },
      { icon: HardDrive, text: "320 GB NVMe SSD" },
      { icon: Globe, text: "8 TB Bandwidth" },
      { icon: Check, text: "Daily Backups" },
    ],
    popular: false,
  },
    {
    name: "VPS Enterprise",
    price: "$160",
    description: "Maximum performance for critical workloads.",
    features: [
      { icon: Cpu, text: "16 vCPU Cores" },
      { icon: MemoryStick, text: "32 GB RAM" },
      { icon: HardDrive, text: "640 GB NVMe SSD" },
      { icon: Globe, text: "10 TB Bandwidth" },
      { icon: Check, text: "Priority Support" },
    ],
    popular: false,
  },
];

const webHostingPlans = [
    {
        name: "Personal",
        price: "$5.99",
        description: "Great for personal sites and blogs.",
        features: [
            { icon: Globe, text: "1 Website" },
            { icon: HardDrive, text: "50 GB SSD Storage" },
            { icon: Globe, text: "1 TB Bandwidth" },
            { icon: Mail, text: "5 Email Accounts" },
        ],
        popular: false,
    },
    {
        name: "Business",
        price: "$9.99",
        description: "More power for small business websites.",
        features: [
            { icon: Globe, text: "10 Websites" },
            { icon: HardDrive, text: "100 GB SSD Storage" },
            { icon: Globe, text: "Unmetered Bandwidth" },
            { icon: Mail, text: "25 Email Accounts" },
            { icon: Check, text: "Free Domain (1st Year)" },
        ],
        popular: true,
    },
    {
        name: "Pro",
        price: "$19.99",
        description: "For agencies and multiple high-traffic sites.",
        features: [
            { icon: Globe, text: "Unlimited Websites" },
            { icon: HardDrive, text: "200 GB NVMe Storage" },
            { icon: Globe, text: "Unmetered Bandwidth" },
            { icon: Mail, text: "Unlimited Email Accounts" },
            { icon: Check, text: "Staging Site" },
        ],
        popular: false,
    },
];

const dedicatedPlans = [
    {
        name: "DS-1",
        price: "$149",
        description: "Entry-level dedicated power for serious projects.",
        features: [
            { icon: Cpu, text: "Intel Xeon-D 2123IT (4C/8T)" },
            { icon: MemoryStick, text: "32 GB DDR4 RAM" },
            { icon: HardDrive, text: "2x 512 GB NVMe SSD" },
            { icon: Globe, text: "10 TB Bandwidth" },
        ],
        popular: false,
    },
    {
        name: "DS-2",
        price: "$299",
        description: "High performance for demanding applications.",
        features: [
            { icon: Cpu, text: "AMD EPYC 7282 (16C/32T)" },
            { icon: MemoryStick, text: "64 GB DDR4 RAM" },
            { icon: HardDrive, text: "2x 1 TB NVMe SSD" },
            { icon: Globe, text: "20 TB Bandwidth" },
        ],
        popular: true,
    },
    {
        name: "DS-3",
        price: "$499",
        description: "Ultimate power for enterprise-level workloads.",
        features: [
            { icon: Cpu, text: "Dual Intel Xeon Silver 4314 (32C/64T)" },
            { icon: MemoryStick, text: "128 GB DDR4 RAM" },
            { icon: HardDrive, text: "2x 2 TB NVMe SSD" },
            { icon: Globe, text: "30 TB Bandwidth" },
        ],
        popular: false,
    },
];


const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const PlanCard = ({ plan }: { plan: any }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="flex flex-col h-full"
    >
        <Card className={`flex flex-col flex-grow ${plan.popular ? 'border-primary border-2 shadow-primary/20 shadow-lg' : 'shadow-md hover:shadow-xl transition-shadow'}`}>
            {plan.popular && (
                <div className="text-center py-1 bg-primary text-primary-foreground font-semibold rounded-t-lg -mt-px">
                    Most Popular
                </div>
            )}
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="text-center mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-4">
                    {plan.features.map((feature: any, index: number) => (
                        <li key={index} className="flex items-center">
                            <feature.icon className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <span>{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full" variant={plan.popular ? 'default' : 'secondary'}>
                    <Link href="/contact">Get Started</Link>
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
);


export default function PricingPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Flexible Plans for Every Scale
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Choose the perfect plan to meet your business needs. All plans come with 24/7 expert support.
          </p>
        </motion.div>

        <Tabs defaultValue="vps" className="w-full mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="vps" className="py-2">Virtual Servers</TabsTrigger>
              <TabsTrigger value="web-hosting" className="py-2">Web Hosting</TabsTrigger>
              <TabsTrigger value="dedicated" className="py-2">Dedicated Servers</TabsTrigger>
              <TabsTrigger value="colocation" className="py-2">Colocation</TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="vps" className="mt-10">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {vpsPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>

          <TabsContent value="web-hosting" className="mt-10">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {webHostingPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>

          <TabsContent value="dedicated" className="mt-10">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {dedicatedPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="colocation" className="mt-10">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
                <Card className="shadow-lg max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl flex items-center gap-3"><Building className="h-8 w-8 text-primary" />Server Colocation</CardTitle>
                        <CardDescription>House your hardware in our enterprise-grade data centers. We provide the space, power, cooling, and network.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4 text-lg">
                            <li className="flex items-center"><ShieldCheck className="h-6 w-6 text-primary mr-3" /><span>Secure, 24/7 Monitored Facilities</span></li>
                            <li className="flex items-center"><Zap className="h-6 w-6 text-primary mr-3" /><span>Redundant A+B Power Feeds</span></li>
                            <li className="flex items-center"><Network className="h-6 w-6 text-primary mr-3" /><span>High-Speed, Low-Latency Network</span></li>
                            <li className="flex items-center"><Check className="h-6 w-6 text-primary mr-3" /><span>Flexible Rack Space (per U, half, full)</span></li>
                        </ul>
                        <p className="mt-6 text-muted-foreground">Our colocation services are perfect for businesses looking to leverage world-class infrastructure without the capital expense of building their own data center.</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild size="lg" className="w-full md:w-auto">
                            <Link href="/contact">Contact Sales for a Custom Quote</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
