
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Server, Globe, Database, Building, Cpu, MemoryStick, HardDrive, ShieldCheck, Zap, Network, CloudCog, ArrowRight, Layers, Hand } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const vpsPlans = [
  {
    name: "VPS Nano",
    price: "₹499",
    description: "Perfect for testing and very small scripts.",
    features: [
      { icon: Cpu, text: "1 vCPU Core" },
      { icon: MemoryStick, text: "1 GB RAM" },
      { icon: HardDrive, text: "20 GB NVMe SSD" },
      { icon: Globe, text: "1 TB Bandwidth" },
    ],
    popular: false,
  },
  {
    name: "VPS Micro",
    price: "₹899",
    description: "For lightweight apps and personal projects.",
    features: [
      { icon: Cpu, text: "1 vCPU Core" },
      { icon: MemoryStick, text: "2 GB RAM" },
      { icon: HardDrive, text: "40 GB NVMe SSD" },
      { icon: Globe, text: "2 TB Bandwidth" },
    ],
    popular: false,
  },
  {
    name: "VPS Starter",
    price: "₹1,499",
    description: "Ideal for development and small applications.",
    features: [
      { icon: Cpu, text: "2 vCPU Cores" },
      { icon: MemoryStick, text: "4 GB RAM" },
      { icon: HardDrive, text: "80 GB NVMe SSD" },
      { icon: Globe, text: "4 TB Bandwidth" },
    ],
    popular: false,
  },
  {
    name: "VPS Business",
    price: "₹2,999",
    description: "Perfect for growing websites and applications.",
    features: [
      { icon: Cpu, text: "4 vCPU Cores" },
      { icon: MemoryStick, text: "8 GB RAM" },
      { icon: HardDrive, text: "160 GB NVMe SSD" },
      { icon: Globe, text: "5 TB Bandwidth" },
      { icon: ShieldCheck, text: "Daily Backups" },
    ],
    popular: true,
  },
  {
    name: "VPS Pro",
    price: "₹5,999",
    description: "For demanding applications and high traffic.",
    features: [
      { icon: Cpu, text: "8 vCPU Cores" },
      { icon: MemoryStick, text: "16 GB RAM" },
      { icon: HardDrive, text: "320 GB NVMe SSD" },
      { icon: Globe, text: "8 TB Bandwidth" },
      { icon: ShieldCheck, text: "Daily Backups" },
    ],
    popular: false,
  },
    {
    name: "VPS Enterprise",
    price: "₹12,999",
    description: "Maximum performance for critical workloads.",
    features: [
      { icon: Cpu, text: "16 vCPU Cores" },
      { icon: MemoryStick, text: "32 GB RAM" },
      { icon: HardDrive, text: "640 GB NVMe SSD" },
      { icon: Globe, text: "10 TB Bandwidth" },
      { icon: Zap, text: "Priority Support" },
    ],
    popular: false,
  },
  {
    name: "VPS Elite",
    price: "₹24,999",
    description: "For large-scale enterprise deployments.",
    features: [
      { icon: Cpu, text: "24 vCPU Cores" },
      { icon: MemoryStick, text: "64 GB RAM" },
      { icon: HardDrive, text: "1.2 TB NVMe SSD" },
      { icon: Globe, text: "15 TB Bandwidth" },
      { icon: Zap, text: "Dedicated Support" },
    ],
    popular: false,
  }
];

const webHostingPlans = [
    {
        name: "Starter",
        price: "₹199",
        description: "Perfect for a static landing page or basic blog.",
        features: [
            { icon: Globe, text: "1 Website" },
            { icon: HardDrive, text: "20 GB SSD Storage" },
            { icon: Globe, text: "Unmetered Bandwidth" },
            { icon: ShieldCheck, text: "Free SSL Certificate" },
        ],
        popular: false,
    },
    {
        name: "Personal",
        price: "₹449",
        description: "Great for personal sites and growing blogs.",
        features: [
            { icon: Globe, text: "5 Websites" },
            { icon: HardDrive, text: "50 GB SSD Storage" },
            { icon: Globe, text: "Unmetered Bandwidth" },
            { icon: ShieldCheck, text: "Free SSL Certificate" },
        ],
        popular: false,
    },
    {
        name: "Business",
        price: "₹799",
        description: "More power for small business websites.",
        features: [
            { icon: Globe, text: "10 Websites" },
            { icon: HardDrive, text: "100 GB NVMe Storage" },
            { icon: Globe, text: "Unmetered Bandwidth" },
            { icon: ShieldCheck, text: "Daily Backups" },
        ],
        popular: true,
    },
    {
        name: "Pro",
        price: "₹1,599",
        description: "For agencies and multiple high-traffic sites.",
        features: [
            { icon: Globe, text: "Unlimited Websites" },
            { icon: HardDrive, text: "200 GB NVMe Storage" },
            { icon: Globe, text: "Unmetered Bandwidth" },
            { icon: ShieldCheck, text: "Daily Backups" },
            { icon: Check, text: "Staging Site" },
        ],
        popular: false,
    },
];

const dedicatedPlans = [
    {
        name: "DS-Essential",
        price: "₹7,999",
        description: "Entry-level dedicated power for serious projects.",
        features: [
            { icon: Cpu, text: "Intel Xeon E-2336 (6C/12T)" },
            { icon: MemoryStick, text: "32 GB DDR4 RAM" },
            { icon: HardDrive, text: "2x 250 GB SATA SSD" },
            { icon: Globe, text: "10 TB Bandwidth" },
        ],
        popular: false,
    },
    {
        name: "DS-Standard",
        price: "₹11,999",
        description: "A solid foundation for growing applications.",
        features: [
            { icon: Cpu, text: "Intel Xeon-D 2123IT (4C/8T)" },
            { icon: MemoryStick, text: "32 GB DDR4 RAM" },
            { icon: HardDrive, text: "2x 512 GB NVMe SSD" },
            { icon: Globe, text: "15 TB Bandwidth" },
        ],
        popular: false,
    },
    {
        name: "DS-Advanced",
        price: "₹23,999",
        description: "High performance for demanding applications.",
        features: [
            { icon: Cpu, text: "AMD EPYC 7282 (16C/32T)" },
            { icon: MemoryStick, text: "64 GB DDR4 RAM" },
            { icon: HardDrive, text: "2x 1 TB NVMe SSD" },
            { icon: Globe, text: "25 TB Bandwidth" },
        ],
        popular: true,
    },
    {
        name: "DS-Elite",
        price: "₹39,999",
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

const colocationPlans = [
    {
        name: "Per U",
        price: "₹4,999",
        description: "Ideal for single servers or small network appliances.",
        features: [
            { icon: Layers, text: "1U Rack Space" },
            { icon: Zap, text: "1 Amp Power" },
            { icon: Network, text: "1 Gbps Uplink Port" },
            { icon: Globe, text: "5 TB Bandwidth" },
        ],
        popular: false,
    },
    {
        name: "Quarter Rack",
        price: "₹14,999",
        description: "For small businesses with multiple servers.",
        features: [
            { icon: Layers, text: "10U Rack Space" },
            { icon: Zap, text: "5 Amps Power" },
            { icon: Network, text: "1 Gbps Uplink Port" },
            { icon: Globe, text: "10 TB Bandwidth" },
            { icon: Hand, text: "Basic Remote Hands" },
        ],
        popular: false,
    },
    {
        name: "Half Rack",
        price: "₹24,999",
        description: "Ample space and power for growing infrastructure.",
        features: [
            { icon: Layers, text: "21U Rack Space" },
            { icon: Zap, text: "10 Amps Power" },
            { icon: Network, text: "1 Gbps Uplink Port" },
            { icon: Globe, text: "20 TB Bandwidth" },
            { icon: Hand, text: "Standard Remote Hands" },
        ],
        popular: true,
    },
    {
        name: "Full Rack",
        price: "₹44,999",
        description: "Complete, secure cabinet for mission-critical hardware.",
        features: [
            { icon: Layers, text: "42U Private Rack" },
            { icon: Zap, text: "20 Amps Power" },
            { icon: Network, text: "1 Gbps Uplink Port" },
            { icon: Globe, text: "30 TB Bandwidth" },
            { icon: Hand, text: "Advanced Remote Hands" },
        ],
        popular: false,
    },
];


const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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
                    <Link href="/order">Get Started</Link>
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
              <TabsTrigger value="vps" className="py-2">Virtual Servers</TabsTrigger>
              <TabsTrigger value="web-hosting" className="py-2">Web Hosting</TabsTrigger>
              <TabsTrigger value="dedicated" className="py-2">Dedicated Servers</TabsTrigger>
              <TabsTrigger value="colocation" className="py-2">Colocation</TabsTrigger>
              <TabsTrigger value="on-premise-cloud" className="py-2">On-premise Cloud</TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="vps" className="mt-10">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {vpsPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>

          <TabsContent value="web-hosting" className="mt-10">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {webHostingPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>

          <TabsContent value="dedicated" className="mt-10">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {dedicatedPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="colocation" className="mt-10">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {colocationPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>

          <TabsContent value="on-premise-cloud" className="mt-10">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
                <Card className="shadow-lg max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl flex items-center gap-3"><CloudCog className="h-8 w-8 text-primary" />On-premise Cloud</CardTitle>
                        <CardDescription>Your own private cloud, deployed on-premises at your business location for ultimate control and security.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4 text-lg">
                            <li className="flex items-center"><ShieldCheck className="h-6 w-6 text-primary mr-3" /><span>Tailored to your specific compliance and security needs.</span></li>
                            <li className="flex items-center"><Zap className="h-6 w-6 text-primary mr-3" /><span>Dedicated performance with hardware you control.</span></li>
                            <li className="flex items-center"><Network className="h-6 w-6 text-primary mr-3" /><span>Fully managed by our experts or co-managed with your IT team.</span></li>
                            <li className="flex items-center"><Check className="h-6 w-6 text-primary mr-3" /><span>Scalable architecture that grows with your business.</span></li>
                        </ul>
                        <p className="mt-6 text-muted-foreground">On-premise Cloud is the ideal solution for businesses requiring maximum data sovereignty, performance, and customized infrastructure. Let us build the perfect cloud for you.</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild size="lg" className="w-full md:w-auto">
                            <Link href="/contact">Contact Sales for a Consultation</Link>
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

    