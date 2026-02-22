"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { useToast } from "../../hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from "../../components/ui/separator"
import { Slider } from "../../components/ui/slider"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { User, Home, Fingerprint, Send, Server, Cloud, Loader2, Globe, Database, Building, Package, FileText, CheckCircle } from "lucide-react"
import { Checkbox } from "../../components/ui/checkbox"
import { db, storage } from "../../lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { notifyAdmin } from "../actions/notify"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const vpsPlans = [
  { name: "VPS Nano", description: "1 vCPU, 1 GB RAM, 20 GB NVMe" },
  { name: "VPS Micro", description: "1 vCPU, 2 GB RAM, 40 GB NVMe" },
  { name: "VPS Starter", description: "2 vCPU, 4 GB RAM, 80 GB NVMe" },
  { name: "VPS Business", description: "4 vCPU, 8 GB RAM, 160 GB NVMe" },
  { name: "VPS Pro", description: "8 vCPU, 16 GB RAM, 320 GB NVMe" },
  { name: "VPS Enterprise", description: "16 vCPU, 32 GB RAM, 640 GB NVMe" },
  { name: "VPS Elite", description: "24 vCPU, 64 GB RAM, 1.2 TB NVMe" },
  { name: "Custom", description: "Tailored specs for your unique needs." },
];

const orderFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
  address: z.string().min(10, "Address must be at least 10 characters."),
  pincode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit pincode."),
  businessName: z.string().optional(),
  gstNumber: z.string().optional(),
  serviceType: z.enum(["vps", "cloud-x", "web-hosting", "dedicated-server", "colocation"], {
    required_error: "You need to select a service type.",
  }),
  vpsPlan: z.string().optional(),
  webHostingPlan: z.string().optional(),
  dedicatedServerPlan: z.string().optional(),
  colocationPlan: z.string().optional(),
  customRequirements: z.string().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions to proceed." }),
  }),
});

export default function OrderPage() {
  const { toast } = useToast()
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userCount, setUserCount] = useState(1);

  const form = useForm<z.infer<typeof orderFormSchema>>({
      resolver: zodResolver(orderFormSchema),
      defaultValues: {
          name: "",
          email: "",
          mobile: "",
          address: "",
          pincode: "",
          businessName: "",
          gstNumber: "",
          serviceType: "vps",
          vpsPlan: "",
          termsAccepted: false,
      },
  })

  const serviceType = form.watch("serviceType");

  async function onSubmit(data: z.infer<typeof orderFormSchema>) {
    console.log("Submitting Infrastructure Order:", data);
    setIsSubmitting(true);
    try {
      let gstCertificateUrl = "";
      const gstFileList = (document.getElementById('gstCertificate') as HTMLInputElement)?.files;
      const gstFile = gstFileList?.[0];

      if (gstFile) {
        console.log("Uploading GST Certificate:", gstFile.name);
        if (gstFile.size > MAX_FILE_SIZE) throw new Error("File too large (max 5MB)");
        const storageRef = ref(storage, `gst-certificates/${Date.now()}_${gstFile.name}`);
        const snapshot = await uploadBytes(storageRef, gstFile);
        gstCertificateUrl = await getDownloadURL(snapshot.ref);
        console.log("GST Upload Success:", gstCertificateUrl);
      }
      
      const orderData = {
        ...data,
        gstCertificate: gstCertificateUrl,
        userCount: serviceType === 'cloud-x' ? userCount : null,
        submittedAt: serverTimestamp(),
      };
      
      // 1. Save to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order saved to Firestore ID:", docRef.id);

      // 2. Notify Admin (Non-blocking)
      notifyAdmin({ type: 'order', data: orderData }).catch(e => console.error("Notification alert failed:", e));

      setIsOrderSubmitted(true);
      toast({
        title: "Order Placed!",
        description: "Your infrastructure request has been queued successfully.",
      });
    } catch (error: any) {
      console.error("Order fatal error:", error);
      toast({
        title: "Order Failed",
        description: error.message || "Could not process your order. Please check your connection and configuration.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const handleAadhaarVerification = () => {
    toast({
        title: "Redirecting...",
        description: "Aadhaar verification system is currently offline for maintenance.",
    });
  }

  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="text-center bg-primary text-primary-foreground py-12">
            <Package className="mx-auto h-16 w-16 mb-4" />
            <CardTitle className="text-4xl font-black">Configure Your Infrastructure</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Set up your high-performance environment and secure your deployment.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {isOrderSubmitted ? (
                <motion.div
                  key="order-success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-8 rounded-full w-fit mx-auto mb-8">
                    <CheckCircle className="h-24 w-24 text-green-500" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4">Order Received!</h3>
                  <p className="text-muted-foreground text-xl mb-12 max-w-lg mx-auto leading-relaxed">
                    Your infrastructure request has been queued. As a security measure, please proceed with Aadhaar verification to finalize your deployment.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-xl shadow-primary/20" onClick={handleAadhaarVerification}>
                      <Fingerprint className="mr-2 h-6 w-6" /> Proceed to Aadhaar Verification
                    </Button>
                    <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg" asChild>
                      <Link href="/">Return Home</Link>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="order-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                      
                      {/* Section 1: Contact */}
                      <div className="space-y-6">
                          <h3 className="text-2xl font-bold flex items-center gap-3"><User className="text-primary" /> Contact Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField control={form.control} name="name" render={({ field }) => (
                                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name="email" render={({ field }) => (
                                  <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name="mobile" render={({ field }) => (
                                  <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input placeholder="9876543210" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                          </div>
                      </div>

                      <Separator />
                      
                      {/* Section 2: Service */}
                      <div className="space-y-6">
                          <h3 className="text-2xl font-bold flex items-center gap-3"><Server className="text-primary" /> Service Configuration</h3>
                          <FormField
                              control={form.control}
                              name="serviceType"
                              render={({ field }) => (
                                  <FormItem className="space-y-3">
                                  <FormLabel>Select Infrastructure Type</FormLabel>
                                  <FormControl>
                                      <RadioGroup
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                          className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                      >
                                      {[
                                        { val: "vps", label: "VPS", icon: Server },
                                        { val: "cloud-x", label: "Shared Server", icon: Cloud },
                                        { val: "web-hosting", label: "Web Hosting", icon: Globe },
                                        { val: "dedicated-server", label: "Dedicated", icon: Database },
                                        { val: "colocation", label: "Colocation", icon: Building },
                                      ].map((item) => (
                                        <FormItem key={item.val} className="flex items-center space-x-3 space-y-0 p-4 rounded-xl border-2 border-secondary hover:border-primary/30 transition-all cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                            <FormControl><RadioGroupItem value={item.val} /></FormControl>
                                            <FormLabel className="font-semibold flex items-center gap-2 cursor-pointer"><item.icon className="h-5 w-5 text-primary" />{item.label}</FormLabel>
                                        </FormItem>
                                      ))}
                                      </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />

                          <div className="mt-8">
                              {serviceType === 'vps' && (
                                  <FormField control={form.control} name="vpsPlan" render={({ field }) => (
                                      <FormItem><FormLabel className="flex items-center gap-2"><Package size={16} />Select VPS Plan</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-14 rounded-xl"><SelectValue placeholder="Choose a VPS plan..." /></SelectTrigger></FormControl>
                                      <SelectContent className="rounded-xl">{vpsPlans.map(plan => <SelectItem key={plan.name} value={plan.name}><div><p className="font-bold">{plan.name}</p><p className="text-xs text-muted-foreground">{plan.description}</p></div></SelectItem>)}</SelectContent>
                                      </Select><FormMessage /></FormItem>
                                  )} />
                              )}
                              {serviceType === 'cloud-x' && (
                                  <div className="space-y-8 p-6 rounded-2xl bg-secondary/30">
                                      <FormItem>
                                        <FormLabel className="text-lg font-bold">Number of Concurrent User IDs: <span className="text-primary">{userCount}</span></FormLabel>
                                        <FormControl>
                                          <Slider min={1} max={50} step={1} defaultValue={[userCount]} onValueChange={(value) => setUserCount(value[0])} className="py-4" />
                                        </FormControl>
                                        <FormDescription>Assign unique IDs to each member of your accounting team.</FormDescription>
                                      </FormItem>
                                  </div>
                              )}
                          </div>
                      </div>

                      <Separator />

                      {/* Section 3: Billing & Legal */}
                      <div className="space-y-6">
                          <h3 className="text-2xl font-bold flex items-center gap-3"><Home className="text-primary" /> Billing & Legal</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="md:col-span-2">
                                <FormField control={form.control} name="address" render={({ field }) => (
                                    <FormItem><FormLabel>Billing Address</FormLabel><FormControl><Textarea placeholder="Full address..." className="min-h-[100px] rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                              </div>
                              <FormField control={form.control} name="pincode" render={({ field }) => (
                                  <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="452001" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField control={form.control} name="gstNumber" render={({ field }) => (
                                  <FormItem><FormLabel>GST Number (Optional)</FormLabel><FormControl><Input placeholder="29ABCDE1234F1Z5" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormItem>
                                  <FormLabel className="flex items-center gap-2"><FileText size={16} /> GST Certificate (PDF, max 5MB)</FormLabel>
                                  <FormControl>
                                      <Input id="gstCertificate" type="file" accept=".pdf" className="h-12 rounded-xl file:bg-primary file:text-white file:border-none file:rounded-full file:px-4 file:mr-4 file:cursor-pointer cursor-pointer" />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          </div>
                      </div>

                      <Separator />

                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border-2 p-6 bg-secondary/10">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm">
                                I agree to the <Link href="/terms" target="_blank" className="text-primary font-bold hover:underline">Terms of Service</Link>, <Link href="/privacy" target="_blank" className="text-primary font-bold hover:underline">Privacy Policy</Link>, and <Link href="/sla" target="_blank" className="text-primary font-bold hover:underline">99% Uptime SLA</Link>.
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full h-16 rounded-full text-xl shadow-2xl shadow-primary/30" disabled={isSubmitting}>
                        {isSubmitting ? <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Processing Order...</> : <><Send className="mr-2 h-6 w-6" /> Place Order Now</>}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
