"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

export function Chatbot() {
  return (
    <motion.div
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5,
      }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        size="icon"
        className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
        aria-label="Open chat"
      >
        <MessageSquare className="h-8 w-8 text-primary-foreground" />
      </Button>
    </motion.div>
  )
}
