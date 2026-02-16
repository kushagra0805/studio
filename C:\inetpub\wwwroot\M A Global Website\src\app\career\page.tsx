
"use client"

import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CareerPage() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex justify-center items-center mb-6">
            <Building2 className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Careers at M A Global Network
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
          Join our team and help us build the future of cloud infrastructure. We are always looking for talented individuals who are passionate about technology and innovation.
        </p>
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Current Openings</h2>
          <div className="mt-6 text-muted-foreground">
            <p>There are no open positions at this time.</p>
            <p>Please check back later or send your resume to <a href="mailto:info@cloud-x.in" className="text-primary hover:underline">info@cloud-x.in</a> and we will keep it on file for future opportunities.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
