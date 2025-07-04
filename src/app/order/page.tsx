
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useForm, useFieldArray } from "react-hook-form"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, Home, Briefcase, FileText, Cpu, MemoryStick, HardDrive, Fingerprint, Send, Server, Cloud, Loader2, Globe, Database, Building } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

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
  
  // Service Requirements
  serviceType: z.enum(["vps", "cloud-x", "web-hosting", "dedicated-server", "colocation"], {
    required_error: "You need to select a service type.",
  }),

  userNames: z.array(z.object({
    name: z.string().min(2, "User name must be at least 2 characters."),
  })).optional(),
  
  cpu: z.number().min(1).max(64).optional(),
  ram: z.number().min(2).max(128).optional(),
  storage: z.number().min(20).max(2048).optional(),
  
  // Terms
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions to proceed." }),
  }),
}).superRefine((data, ctx) => {
    if (data.serviceType === "vps") {
        if (data.cpu === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["cpu"],
            message: "CPU cores are required for a VPS.",
          });
        }
        if (data.ram === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["ram"],
            message: "RAM is required for a VPS.",
          });
        }
        if (data.storage === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["storage"],
            message: "Storage is required for a VPS.",
          });
        }
    }
    if (data.serviceType === "cloud-x") {
        if (!data.userNames || data.userNames.length < 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["userNames"],
                message: "At least one user is required for Cloud-x service.",
            });
        }
    }
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
          userNames: [{ name: "" }],
          cpu: 2,
          ram: 4,
          storage: 80,
          termsAccepted: false,
      },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "userNames"
  });

  useEffect(() => {
    const currentCount = fields.length;
    if (userCount > currentCount) {
        for (let i = currentCount; i < userCount; i++) {
            append({ name: "" });
        }
    } else if (userCount < currentCount) {
        for (let i = currentCount; i > userCount; i--) {
            remove(i - 1);
        }
    }
  }, [userCount, fields.length, append, remove]);

  const fileRef = form.register("gstCertificate");
  const serviceType = form.watch("serviceType");

  async function onSubmit(data: z.infer<typeof orderFormSchema>) {
    setIsSubmitting(true);
    try {
      let gstCertificateUrl = "";
      const gstFile = data.gstCertificate?.[0];

      if (gstFile) {
        const storageRef = ref(storage, `gst-certificates/${Date.now()}_${gstFile.name}`);
        const snapshot = await uploadBytes(storageRef, gstFile);
        gstCertificateUrl = await getDownloadURL(snapshot.ref);
      }
      
      const orderData = {
        ...data,
        gstCertificate: gstCertificateUrl,
        submittedAt: new Date(),
      };
      
      await addDoc(collection(db, "orders"), orderData);

      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your order. Please proceed with Aadhaar verification.",
      });
      setIsOrderSubmitted(true);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const handleAadhaarVerification = () => {
    toast({
        title: "Redirecting to Aadhaar Verification",
        description: "This is a placeholder for the actual verification flow.",
    });
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
            <CardTitle className="text-3xl font-bold mt-4">Place Your Order</CardTitle>
            <CardDescription className="text-lg">
              Configure your service and provide your details to get started.
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

                {/* Service Requirements */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Server /> Service Requirements</h3>
                    <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Select Service Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="vps" /></FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2"><Server className="h-5 w-5" />VPS</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="cloud-x" /></FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2"><Cloud className="h-5 w-5" />Cloud-x</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="web-hosting" /></FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2"><Globe className="h-5 w-5" />Web Hosting</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="dedicated-server" /></FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2"><Database className="h-5 w-5" />Dedicated</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="colocation" /></FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2"><Building className="h-5 w-5" />Colocation</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-6 mt-6">
                        {serviceType === 'cloud-x' && (
                            <div className="space-y-6">
                                <FormItem>
                                  <FormLabel>Number of Users/IDs: {userCount}</FormLabel>
                                  <FormControl>
                                    <Slider
                                      min={1}
                                      max={50}
                                      step={1}
                                      defaultValue={[userCount]}
                                      onValueChange={(value) => setUserCount(value[0])}
                                    />
                                  </FormControl>
                                </FormItem>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    {fields.map((item, index) => (
                                        <FormField
                                            control={form.control}
                                            key={item.id}
                                            name={`userNames.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name for User ID #{index + 1}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={`Enter name...`} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {serviceType === 'vps' && (
                            <>
                                <FormField control={form.control} name="cpu" render={({ field }) => (
                                    <FormItem><FormLabel className="flex items-center gap-2"><Cpu />CPU Cores: {field.value}</FormLabel><FormControl><Slider min={1} max={64} step={1} defaultValue={[field.value ?? 2]} onValueChange={(value) => field.onChange(value[0])} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="ram" render={({ field }) => (
                                    <FormItem><FormLabel className="flex items-center gap-2"><MemoryStick />RAM (GB): {field.value}</FormLabel><FormControl><Slider min={2} max={128} step={2} defaultValue={[field.value ?? 4]} onValueChange={(value) => field.onChange(value[0])} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="storage" render={({ field }) => (
                                    <FormItem><FormLabel className="flex items-center gap-2"><HardDrive />Storage (GB): {field.value}</FormLabel><FormControl><Slider min={20} max={2048} step={10} defaultValue={[field.value ?? 80]} onValueChange={(value) => field.onChange(value[0])} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </>
                        )}
                    </div>
                </div>

                <Separator />
                
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          By checking this box, you agree to our{' '}
                          <Link href="/terms" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" target="_blank" className="font-medium text-primary underline-offset-4 hover:underline">
                            Privacy Policy
                          </Link>
                          .
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Submitting...' : 'Submit Order'}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
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
