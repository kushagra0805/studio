
import { Cpu, MemoryStick, HardDrive, Globe, ShieldCheck, Zap, Layers, Hand, Check, Network } from "lucide-react";

export interface PlanFeature {
  icon: any;
  text: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  popular: boolean;
}

export const vpsPlans: PricingPlan[] = [
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

export const webHostingPlans: PricingPlan[] = [
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

export const dedicatedPlans: PricingPlan[] = [
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

export const colocationPlans: PricingPlan[] = [
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
