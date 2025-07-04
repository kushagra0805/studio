
"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChatInterface } from "./chat-interface"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-8 right-8 z-50">
       <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-[80px] right-0"
          >
            <ChatInterface onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-2xl transition-all duration-300"
          aria-label={isOpen ? "Close chat" : "Open chat"}
          onClick={toggleChat}
        >
          {isOpen ? (
            <X className="h-8 w-8 text-primary-foreground" />
          ) : (
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          )}
        </Button>
      </motion.div>
    </div>
  )
}
