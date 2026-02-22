
"use client"

import { useState } from "react"
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
import { Mail, Send, User, MessageSquare, Loader2, CheckCircle, Phone } from "lucide-react";
import { db } from "../../lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { Separator } from "../../components/ui/separator"
import { notifyAdmin } from "../actions/notify"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message cannot exceed 500 characters."),
})

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof contactFormSchema>>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: {
          name: "",
          email: "",
          subject: "",
          message: "",
      },
  })

  async function onSubmit(data: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true)
    try {
      const submissionData = {
        ...data,
        submittedAt: new Date(),
      };

      // 1. Save to Firestore
      await addDoc(collection(db, "contacts"), submissionData);
      
      // 2. Notify Admin via Email (Server Action)
      await notifyAdmin({ type: 'contact', data: submissionData });
      
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      })
      form.reset()
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-24 px-4 md:px-6 min-h-[80vh] flex items-center justify-center">
      <motion.div 
        className="max-w-3xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="text-center bg-primary text-primary-foreground py-12">
            <Mail className="mx-auto h-16 w-16 mb-4" />
            <CardTitle className="text-4xl font-black">Get In Touch</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Have a question or need a custom quote? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success-popup"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full w-fit mx-auto mb-8">
                    <CheckCircle className="h-20 w-20 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
                    Thank you for reaching out to M A Global Network. Our expert team will review your message and get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} size="lg" className="rounded-full px-10">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-secondary">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary"><Mail className="h-6 w-6" /></div>
                        <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Us</p>
                            <a href="mailto:info@cloud-x.in" className="font-semibold hover:text-primary">info@cloud-x.in</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-secondary">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary"><Phone className="h-6 w-6" /></div>
                        <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Call Us</p>
                            <a href="tel:7024058800" className="font-semibold hover:text-primary">7024058800</a>
                        </div>
                    </div>
                  </div>

                  <Separator className="mb-12" />

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2"><User size={16} /> Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2"><Mail size={16} /> Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="How can we help?" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2"><MessageSquare size={16} /> Your Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your infrastructure needs..."
                                className="min-h-[150px] rounded-xl"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" size="lg" className="w-full h-14 rounded-full text-lg shadow-xl shadow-primary/20" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                        ) : (
                          <><Send className="mr-2 h-5 w-5" /> Send Message</>
                        )}
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
