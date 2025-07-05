"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Link from 'next/link';
import { ArrowUp, Bot, Loader2, User, X, Contact, MessageSquareText } from "lucide-react";
import { chat } from "@/ai/flows/chat";
import type { ChatMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Helper for WhatsApp link
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5" fill="currentColor">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.8-26.7l-7-4.1-72.2 18.9L46.4 358l-4.5-7.3c-18.9-30.8-28.5-66.3-28.5-102.9 0-110.4 89.6-199.9 199.9-199.9 54.4 0 105.7 21.2 143.2 58.7 37.5 37.5 58.7 88.8 58.7 143.2 0 110.3-89.6 199.9-199.9 199.9zM196.4 179.9c-2.4-5.3-5.2-5.6-8.8-5.8-3.1-.2-6.6-.2-10.2.1-3.6.3-9.5 1.4-14.5 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6-5.5-2.7-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.7-23.2-8.5-44.2-27.1-16.3-14.5-27.3-32.5-30.4-37.9-3.1-5.6-.3-8.8 2.5-11.6 2.4-2.4 5.3-6.5 8-8.5 2.7-2.1 3.6-3.7 5.3-6.2 1.7-2.5 1-5 .1-6.9z" />
    </svg>
);
const phoneNumber = "911234567890"; // Placeholder: Replace with your number
const message = "Hello, I'm interested in your services and need live support.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

interface ChatInterfaceProps {
  onClose: () => void;
}

const CHAT_HISTORY_KEY = 'ma_global_chat_history';

export function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on initial render
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Could not load chat history:", error);
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch (error)      {
      console.error("Could not save chat history:", error);
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "div[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Pass only the recent history to avoid large payloads
      const historyToSend = newMessages.slice(-10);
      const response = await chat(historyToSend, currentInput);
      const botMessage: ChatMessage = { role: "model", content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        role: "model",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[380px] h-[550px] flex flex-col shadow-2xl rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <CardTitle>M A Global Support</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        <Tabs defaultValue="ai" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-auto px-4">
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            <TabsTrigger value="live">Live Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="flex-1 flex flex-col overflow-hidden m-0">
             <ScrollArea className="flex-1 h-full p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    <AnimatePresence>
                    {messages.map((message, index) => (
                        <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-3 ${
                            message.role === "user" ? "justify-end" : ""
                        }`}
                        >
                        {message.role === "model" && (
                            <Bot className="h-6 w-6 text-primary shrink-0" />
                        )}
                        <div
                            className={`rounded-lg px-3 py-2 max-w-[80%] text-sm break-words ${
                            message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary"
                            }`}
                        >
                            {message.content}
                        </div>
                        {message.role === "user" && (
                            <User className="h-6 w-6 shrink-0" />
                        )}
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3"
                        >
                        <Bot className="h-6 w-6 text-primary shrink-0" />
                        <div className="rounded-lg px-3 py-2 bg-secondary flex items-center justify-center">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        </div>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about our services..."
                    autoComplete="off"
                    disabled={isLoading}
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        handleSubmit(e);
                    }
                    }}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <ArrowUp className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                </Button>
                </form>
            </div>
          </TabsContent>

          <TabsContent value="live" className="flex-1 m-0">
            <div className="p-6 flex flex-col items-center justify-center text-center h-full">
                <MessageSquareText className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Talk to a Human</h3>
                <p className="text-muted-foreground mb-6">
                    Our support team is ready to help you with any questions you may have.
                </p>
                <div className="w-full space-y-4">
                    <Button asChild className="w-full bg-[#25D366] hover:bg-[#1EAE54] text-white" size="lg">
                        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon /> Chat on WhatsApp
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                        <Link href="/contact">
                            <Contact className="h-5 w-5" /> Contact Form
                        </Link>
                    </Button>
                </div>
                 <p className="text-xs text-muted-foreground mt-8">
                    Our team is available 24/7 to assist you.
                </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
