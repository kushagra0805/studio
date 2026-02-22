
"use client"

import { useState } from "react";
import { Building2, Lightbulb, TrendingUp, Users, HeartHandshake, MapPin, ArrowRight, Mail, Phone, Briefcase, FileText, Upload, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../hooks/use-toast";
import Image from "next/image";
import { db, storage } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { notifyAdmin } from "../actions/notify";

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
    const resumeFile = (document.getElementById('resume') as HTMLInputElement)?.files?.[0];

    if (!resumeFile) {
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
      // 1. Upload to Storage
      const storageRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name}`);
      const snapshot = await uploadBytes(storageRef, resumeFile);
      const resumeUrl = await getDownloadURL(snapshot.ref);

      const resumeData = {
        name,
        email,
        mobile,
        position,
        resumeUrl,
        submittedAt: serverTimestamp(),
      };

      // 2. Save to Firestore
      await addDoc(collection(db, "resumes"), resumeData);

      // 3. Notify Admin (Non-blocking)
      notifyAdmin({ type: 'resume', data: resumeData }).catch(err => console.error("Email notify failed", err));

      setIsSubmitted(true);
      toast({ title: "Application Sent!", description: "We have received your resume. Our team will contact you soon." });
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({ title: "Error", description: "There was a problem submitting your application. Please check your connection.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950 -z-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-slate-950 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white/10 backdrop-blur-md mb-8 border border-white/20">
                <Briefcase className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl text-white mb-8">
              Build the Future of <span className="text-primary">Cloud</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-medium">
              Join M A Global Network and be part of a high-performance team that's redefining enterprise infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
           <div className="text-center mb-20">
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl text-slate-900 dark:text-white">Life at M A Global Network</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                We're committed to creating an environment where high-performers can innovate and lead.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {perks.map((perk, index) => (
                <Card key={index} className="h-full border-none shadow-xl bg-slate-50 dark:bg-slate-900 rounded-[2rem] hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="pt-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <perk.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{perk.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-10">
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{perk.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>

      {/* Resume Submission Section */}
      <section id="apply" className="py-32 bg-slate-100 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-[0_50px_100px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden">
              <div className="grid lg:grid-cols-5 h-full">
                <div className="lg:col-span-2 bg-primary p-12 text-primary-foreground flex flex-col justify-center">
                    <h3 className="text-4xl font-black mb-6">Start Your Journey</h3>
                    <p className="text-primary-foreground/90 text-lg mb-10 font-medium">
                        Upload your resume and tell us which mission you want to join. We review all applications within 48 hours.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-center">
                            <CheckCircle className="h-6 w-6 text-white" />
                            <span className="font-bold">Review in 48 Hours</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <CheckCircle className="h-6 w-6 text-white" />
                            <span className="font-bold">Technical Assessment</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <CheckCircle className="h-6 w-6 text-white" />
                            <span className="font-bold">Leadership Interview</span>
                        </div>
                    </div>
                </div>
                <CardContent className="lg:col-span-3 p-12 bg-white dark:bg-slate-800">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        key="resume-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                      >
                        <div className="bg-green-100 dark:bg-green-900/30 p-8 rounded-full w-fit mx-auto mb-8">
                            <CheckCircle className="h-20 w-20 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white">Resume Submitted!</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-sm mx-auto font-medium">Thank you for your interest. Our talent acquisition team will review your profile and reach out via email.</p>
                        <Button onClick={() => setIsSubmitted(false)} size="lg" className="rounded-full px-10 h-14 text-lg">Submit Another</Button>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="resume-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleResumeSubmit} 
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-900 dark:text-slate-200 font-bold">Full Name</Label>
                          <Input id="name" name="name" required placeholder="John Doe" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-900 dark:text-slate-200 font-bold">Email Address</Label>
                            <Input id="email" name="email" type="email" required placeholder="you@example.com" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700" />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="mobile" className="text-slate-900 dark:text-slate-200 font-bold">Mobile Number</Label>
                            <Input id="mobile" name="mobile" required placeholder="9876543210" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700" />
                            </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position" className="text-slate-900 dark:text-slate-200 font-bold">Target Position</Label>
                          <Input id="position" name="position" required placeholder="e.g., Cloud Architect" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="resume" className="text-slate-900 dark:text-slate-200 font-bold">Resume (PDF only, max 5MB)</Label>
                          <div className="relative group">
                            <Input 
                              id="resume" 
                              name="resume" 
                              type="file" 
                              accept=".pdf" 
                              required 
                              className="cursor-pointer h-14 rounded-xl file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-all bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>
                        <Button type="submit" size="lg" className="w-full h-16 rounded-full text-xl font-bold shadow-2xl shadow-primary/20 mt-6" disabled={isSubmitting}>
                          {isSubmitting ? <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Transmitting...</> : <><Upload className="mr-2 h-6 w-6" /> Submit Application</>}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Reach Us Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-black tracking-tight mb-8 flex items-center gap-4 text-slate-900 dark:text-white">
                <MapPin className="h-10 w-10 text-primary" /> Visit Our Office
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start p-6 rounded-3xl bg-secondary/30 border border-secondary transition-transform hover:scale-[1.02]">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shadow-inner"><Building2 className="h-6 w-6" /></div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">M A Global Network HQ</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">123 Cloud Avenue, Tech Park<br />Indore, MP, 452001, India</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center p-6 rounded-3xl bg-secondary/30 border border-secondary transition-transform hover:scale-[1.02]">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shadow-inner"><Mail className="h-6 w-6" /></div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">Career Inquiries</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">careers@cloud-x.in</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center p-6 rounded-3xl bg-secondary/30 border border-secondary transition-transform hover:scale-[1.02]">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shadow-inner"><Phone className="h-6 w-6" /></div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">HR Desk</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">+91 70240 58800</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
               <Image 
                src="https://picsum.photos/seed/datacenter-lobby/1200/800" 
                width={1200}
                height={800}
                alt="Our Office" 
                className="object-cover w-full h-full"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
               <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Global HQ</p>
                  <p className="text-2xl font-black">Indore Technology Park</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
