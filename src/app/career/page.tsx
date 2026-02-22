
"use client"

import { useState } from "react";
import { Building2, Lightbulb, TrendingUp, Users, HeartHandshake, MapPin, ArrowRight, Mail, Phone, Briefcase, FileText, Upload, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import { db, storage } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const perks = [
  {
    icon: Lightbulb,
    title: "Innovative Projects",
    description: "Work on cutting-edge cloud technology and solve real-world problems for a diverse global client base."
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "We invest in our people. Get access to training, certifications, and clear paths for professional advancement."
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Join a supportive team of passionate experts who value teamwork, diversity, and knowledge sharing."
  },
  {
    icon: HeartHandshake,
    title: "Work-Life Balance",
    description: "We believe in a healthy balance. Enjoy flexible work arrangements and a positive, results-driven environment."
  }
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function CareerPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleResumeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const position = formData.get("position") as string;
    const resumeFile = formData.get("resume") as File;

    if (!resumeFile || resumeFile.size === 0) {
      toast({ title: "Error", description: "Please upload your resume.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      toast({ title: "Error", description: "File size exceeds 5MB limit.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const storageRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name}`);
      const snapshot = await uploadBytes(storageRef, resumeFile);
      const resumeUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "resumes"), {
        name,
        email,
        mobile,
        position,
        resumeUrl,
        submittedAt: new Date(),
      });

      setIsSubmitted(true);
      toast({ title: "Application Sent!", description: "We have received your resume. Our team will contact you soon." });
    } catch (error) {
      console.error("Submission error:", error);
      toast({ title: "Error", description: "There was a problem submitting your application.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6">
                <Briefcase className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build the Future of <span className="text-primary">Cloud</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Join M A Global Network and be part of a team that's redefining advanced cloud infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Life at M A Global Network</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We're committed to creating an environment where every individual can thrive.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {perks.map((perk, index) => (
                <Card key={index} className="h-full border-none shadow-none bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4 shadow-md">
                      <perk.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{perk.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{perk.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>

      {/* Resume Submission Section */}
      <section id="apply" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 shadow-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">Apply Now</CardTitle>
                <CardDescription className="text-lg">
                  Submit your details and resume (PDF, max 5MB).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
                      <p className="text-muted-foreground mb-8">Thank you for your interest. We will review your resume and get back to you soon.</p>
                      <Button onClick={() => setIsSubmitted(false)}>Submit Another Resume</Button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleResumeSubmit} 
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" required placeholder="Your Name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <Input id="mobile" name="mobile" required placeholder="9876543210" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position Applied For</Label>
                          <Input id="position" name="position" required placeholder="e.g., Cloud Architect" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume (PDF, max 5MB)</Label>
                        <div className="relative group">
                          <Input 
                            id="resume" 
                            name="resume" 
                            type="file" 
                            accept=".pdf" 
                            required 
                            className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          />
                        </div>
                      </div>
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Submit Application"}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reach Us Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
                <MapPin className="h-8 w-8 text-primary" /> Visit Our Office
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg"><Building2 className="text-primary h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold">M A Global Network HQ</h4>
                    <p className="text-muted-foreground">123 Cloud Avenue, Tech Park<br />Indore, MP, 452001, India</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg"><Mail className="text-primary h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold">Career Inquiries</h4>
                    <p className="text-muted-foreground">careers@cloud-x.in</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg"><Phone className="text-primary h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold">HR Desk</h4>
                    <p className="text-muted-foreground">+91 70240 58800</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border">
               <Image 
                src="https://picsum.photos/seed/datacenter-lobby/800/600" 
                width={800}
                height={600}
                alt="Our Office" 
                className="object-cover"
               />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
