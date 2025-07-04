
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { User, Home, Briefcase, FileText, Cpu, MemoryStick, HardDrive, Fingerprint, Send } from "lucide-react"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const orderFormSchema = z.object({
  // Personal Info
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
  
  // Billing Address
  address: z.string().min(10, "Address must be at least 10 characters."),
  pincode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit pincode."),

  // Business Info
  businessName: z.string().optional(),
  gstNumber: z.string().optional(),
  gstCertificate: z.any()
    .optional()
    .refine((files) => !files || files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => !files || files?.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .pdf files are accepted."
    ),
  
  // VPS Requirements
  users: z.coerce.number().min(1, "At least 1 user is required."),
  cpu: z.number().min(1).max(64),
  ram: z.number().min(2).max(128),
  storage: z.number().min(20).max(2048),
})

export default function OrderPage() {
  const { toast } = useToast()
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false)

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
          users: 1,
          cpu: 2,
          ram: 4,
          storage: 80,
      },
  })

  const fileRef = form.register("gstCertificate");

  function onSubmit(data: z.infer<typeof orderFormSchema>) {
      console.log("Order submitted:", {
        ...data,
        gstCertificate: data.gstCertificate?.[0]?.name,
      })
      toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your order. Please proceed with Aadhaar verification.",
      })
      setIsOrderSubmitted(true)
      // In a real app, you would upload the file and send the data to a server.
  }
  
  const handleAadhaarVerification = () => {
    // This would redirect to a real Aadhaar verification service.
    toast({
        title: "Redirecting to Aadhaar Verification",
        description: "This is a placeholder for the actual verification flow.",
    });
    // For example: window.open("https://uidai.gov.in/", "_blank");
  }

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <Send className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-bold mt-4">Place Your VPS Order</CardTitle>
            <CardDescription className="text-lg">
              Configure your server and provide your details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isOrderSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Contact Information */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><User /> Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="mobile" render={({ field }) => (
                            <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <Separator />
                
                {/* Billing Address */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Home /> Billing Address</h3>
                    <div className="space-y-6">
                         <FormField control={form.control} name="address" render={({ field }) => (
                            <FormItem><FormLabel>Full Address</FormLabel><FormControl><Textarea placeholder="123, Main Street, Your City" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="pincode" render={({ field }) => (
                            <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="110001" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <Separator />

                {/* Business Details */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Briefcase /> Business Details (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="businessName" render={({ field }) => (
                            <FormItem><FormLabel>Business Name</FormLabel><FormControl><Input placeholder="Your Company Pvt. Ltd." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="gstNumber" render={({ field }) => (
                            <FormItem><FormLabel>GST Number</FormLabel><FormControl><Input placeholder="29ABCDE1234F1Z5" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <div className="mt-6">
                        <FormField control={form.control} name="gstCertificate" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2"><FileText /> GST Certificate (PDF)</FormLabel>
                                <FormControl>
                                    <Input type="file" accept=".pdf" {...fileRef} />
                                </FormControl>
                                <FormDescription>Max file size 5MB.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </div>

                <Separator />

                {/* VPS Requirements */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Server /> VPS Requirements</h3>
                    <div className="space-y-6">
                        <FormField control={form.control} name="users" render={({ field }) => (
                            <FormItem><FormLabel>Number of Users/IDs: {field.value}</FormLabel><FormControl><Slider min={1} max={50} step={1} defaultValue={[field.value]} onValueChange={(value) => field.onChange(value[0])} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="cpu" render={({ field }) => (
                            <FormItem><FormLabel className="flex items-center gap-2"><Cpu />CPU Cores: {field.value}</FormLabel><FormControl><Slider min={1} max={64} step={1} defaultValue={[field.value]} onValueChange={(value) => field.onChange(value[0])} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="ram" render={({ field }) => (
                            <FormItem><FormLabel className="flex items-center gap-2"><MemoryStick />RAM (GB): {field.value}</FormLabel><FormControl><Slider min={2} max={128} step={2} defaultValue={[field.value]} onValueChange={(value) => field.onChange(value[0])} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="storage" render={({ field }) => (
                            <FormItem><FormLabel className="flex items-center gap-2"><HardDrive />Storage (GB): {field.value}</FormLabel><FormControl><Slider min={20} max={2048} step={10} defaultValue={[field.value]} onValueChange={(value) => field.onChange(value[0])} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full mt-8">
                  Submit Order <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
            ) : (
                <div className="text-center py-12">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Fingerprint className="mx-auto h-24 w-24 text-green-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-2">Order Complete!</h3>
                        <p className="text-muted-foreground mb-8">One last step. Please complete your Aadhaar verification to finalize your order.</p>
                        <Button size="lg" onClick={handleAadhaarVerification}>
                            Proceed to Aadhaar Verification <Fingerprint className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
