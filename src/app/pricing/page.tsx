
"use client"

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Check, Server, Globe, Database, Building, Cpu, MemoryStick, HardDrive, ShieldCheck, Zap, Network, CloudCog, Layers, Hand, Cloud } from "lucide-react";
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
        className="flex flex-col h-full"
    >
        <Card className={`flex flex-col flex-grow rounded-[2rem] border-none shadow-xl ${plan.popular ? 'ring-2 ring-primary shadow-primary/20' : ''}`}>
            {plan.popular && (
                <div className="text-center py-1 bg-primary text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-t-[2rem] -mt-px">
                    Most Popular
                </div>
            )}
            <CardHeader className="text-center pt-10">
                <CardTitle className="text-2xl font-black">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow px-8">
                <div className="text-center mb-8">
                    <span className="text-5xl font-black text-primary">{plan.price}</span>
                    <span className="text-muted-foreground font-medium">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                    {plan.features.map((feature: any, index: number) => (
                        <li key={index} className="flex items-center text-sm font-medium">
                            <feature.icon className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <span>{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="pb-10 px-8">
                <Button asChild className="w-full h-12 rounded-full font-bold shadow-lg" variant={plan.popular ? 'default' : 'secondary'}>
                    <Link href="/order">Get Started</Link>
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
);


export default function PricingPage() {
  return (
    <div className="bg-background pt-20">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl mb-6">
            Scale Without <span className="text-primary">Limits</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
            Transparent pricing for enterprise infrastructure. All plans are backed by our 99% Uptime SLA and 24/7 expert technical support.
          </p>
        </motion.div>

        <Tabs defaultValue="vps" className="w-full mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto bg-secondary/50 p-2 rounded-2xl md:rounded-full">
              <TabsTrigger value="vps" className="py-3 px-6 rounded-full data-[state=active]:shadow-lg">Virtual Servers</TabsTrigger>
              <TabsTrigger value="shared-server" className="py-3 px-6 rounded-full data-[state=active]:shadow-lg">Shared Server</TabsTrigger>
              <TabsTrigger value="web-hosting" className="py-3 px-6 rounded-full data-[state=active]:shadow-lg">Web Hosting</TabsTrigger>
              <TabsTrigger value="dedicated" className="py-3 px-6 rounded-full data-[state=active]:shadow-lg">Dedicated Power</TabsTrigger>
              <TabsTrigger value="colocation" className="py-3 px-6 rounded-full data-[state=active]:shadow-lg">Colocation</TabsTrigger>
              <TabsTrigger value="on-premise-cloud" className="py-3 px-6 rounded-full data-[state=active]:shadow-lg">On-premise</TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="vps" className="mt-16">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {vpsPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>

          <TabsContent value="shared-server" className="mt-16">
             <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
                <Card className="max-w-3xl mx-auto rounded-[3rem] border-none shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden">
                    <CardHeader className="text-center bg-primary text-primary-foreground py-16">
                        <div className="bg-white/20 p-6 rounded-[2rem] w-fit mx-auto mb-8 backdrop-blur-md">
                            <Cloud className="h-12 w-12 text-white" />
                        </div>
                        <CardTitle className="text-5xl font-black">Shared Server Solutions</CardTitle>
                        <CardDescription className="text-primary-foreground/80 text-lg mt-4">High-availability accounting infrastructure for Tally & Busy.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center p-12">
                         <div className="text-center mb-10">
                            <p className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-2">Pricing Model</p>
                            <span className="text-5xl font-black">Dynamic Quote</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6 text-left max-w-xl mx-auto mb-12">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border">
                                <Check className="h-6 w-6 text-primary shrink-0" />
                                <span className="font-semibold text-lg">Multi-user IDs</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border">
                                <Check className="h-6 w-6 text-primary shrink-0" />
                                <span className="font-semibold text-lg">Daily Backups</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border">
                                <Check className="h-6 w-6 text-primary shrink-0" />
                                <span className="font-semibold text-lg">99% Uptime SLA</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border">
                                <Check className="h-6 w-6 text-primary shrink-0" />
                                <span className="font-semibold text-lg">24/7 Support</span>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                            Our Shared Server solutions (cloud-x.in) are tailored to your specific user requirements and application load. Get a precise quote from our experts.
                        </p>
                        <Button asChild size="lg" className="h-16 px-12 rounded-full text-xl shadow-2xl shadow-primary/30">
                            <Link href="/contact">Consult with an Expert</Link>
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="web-hosting" className="mt-16">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {webHostingPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>

          <TabsContent value="dedicated" className="mt-16">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {dedicatedPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="colocation" className="mt-16">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {colocationPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </motion.div>
          </TabsContent>

          <TabsContent value="on-premise-cloud" className="mt-16">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
                <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden">
                    <CardHeader className="p-12 md:p-16 bg-slate-900 text-white">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="bg-primary p-5 rounded-[2rem] shadow-xl shadow-primary/40">
                                <CloudCog className="h-12 w-12 text-white" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black">On-premise Cloud</h3>
                                <p className="text-slate-400 text-lg">The ultimate private infrastructure control.</p>
                            </div>
                        </div>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-4xl">
                            Deploy your own private cloud at your business location. Total data sovereignty with M A Global Network's managed expertise and high-performance hardware architecture.
                        </p>
                    </CardHeader>
                    <CardContent className="p-12 md:p-16">
                         <div className="grid md:grid-cols-2 gap-12 mb-12">
                            <ul className="space-y-6">
                                <li className="flex items-center text-xl font-bold"><ShieldCheck className="h-8 w-8 text-primary mr-4" /><span>Custom Compliance & Security</span></li>
                                <li className="flex items-center text-xl font-bold"><Zap className="h-8 w-8 text-primary mr-4" /><span>Raw Hardware Performance</span></li>
                            </ul>
                            <ul className="space-y-6">
                                <li className="flex items-center text-xl font-bold"><Network className="h-8 w-8 text-primary mr-4" /><span>Fully Managed Infrastructure</span></li>
                                <li className="flex items-center text-xl font-bold"><Check className="h-8 w-8 text-primary mr-4" /><span>Scalable Private Architecture</span></li>
                            </ul>
                        </div>
                        <Separator className="my-12" />
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <p className="text-xl text-muted-foreground max-w-2xl font-medium">
                                Ideal for businesses requiring maximum data sovereignty and customized hardware control.
                            </p>
                            <Button asChild size="lg" className="h-16 px-12 rounded-full text-xl shadow-2xl shadow-primary/30 w-full md:w-auto">
                                <Link href="/contact">Contact Enterprise Sales</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
