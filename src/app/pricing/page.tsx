import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "VPS Starter",
    price: "$20",
    description: "Ideal for development and small applications.",
    features: [
      "2 vCPU Cores",
      "4 GB RAM",
      "80 GB NVMe SSD",
      "2 TB Bandwidth",
      "Full Root Access",
    ],
    popular: false,
  },
  {
    name: "VPS Business",
    price: "$40",
    description: "Perfect for growing websites and applications.",
    features: [
      "4 vCPU Cores",
      "8 GB RAM",
      "160 GB NVMe SSD",
      "4 TB Bandwidth",
      "Full Root Access",
      "Daily Backups",
    ],
    popular: true,
  },
  {
    name: "VPS Pro",
    price: "$80",
    description: "For demanding applications and high traffic.",
    features: [
      "8 vCPU Cores",
      "16 GB RAM",
      "320 GB NVMe SSD",
      "8 TB Bandwidth",
      "Full Root Access",
      "Daily Backups",
    ],
    popular: false,
  },
];


export default function PricingPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Flexible Plans for Every Scale
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Choose the perfect plan to meet your business needs. All plans come with 24/7 expert support.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary border-2 shadow-primary/20 shadow-lg' : ''}`}>
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
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
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
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold">Dedicated Servers & Colocation</h2>
          <p className="text-muted-foreground mt-2">
            Looking for more power or need to house your own equipment?
          </p>
          <Button asChild className="mt-4" size="lg">
            <Link href="/contact">Contact Sales for a Custom Quote</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
