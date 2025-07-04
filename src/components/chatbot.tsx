
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
    <div className="fixed bottom-8 right-8 z-50 flex items-end gap-3">
      {/* Speech bubble */}
      <AnimatePresence>
        {!isOpen && (
            <motion.div
              key="speech-bubble"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: 1.2 }}
              className="mb-2"
            >
              <div className="relative rounded-lg bg-primary text-primary-foreground px-4 py-2 shadow-lg">
                <p className="text-sm font-medium">I am here to help you</p>
                {/* Arrow pointing to the button */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 
                  border-t-8 border-t-transparent
                  border-b-8 border-b-transparent
                  border-l-8 border-l-primary">
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat button and interface container */}
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-interface"
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

        <div className="relative">
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
                className="relative z-10"
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

            {/* The Ping Animation */}
            {!isOpen && (
                <span className="absolute top-0 left-0 h-16 w-16">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                </span>
            )}
        </div>
      </div>
    </div>
  )
}
