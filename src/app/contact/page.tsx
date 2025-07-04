"use client"

import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <motion.div 
      className="container mx-auto py-16 px-4 md:px-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="space-y-4 text-muted-foreground max-w-lg mx-auto">
        <p>A contact form and other contact details like email, phone number, and address will go here.</p>
        <p>We're ready to answer your questions and help you get started. Reach out to us today!</p>
      </div>
    </motion.div>
  );
}
