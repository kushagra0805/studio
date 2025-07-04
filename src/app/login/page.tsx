"use client"

import type { Metadata } from 'next';
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { KeyRound } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export const metadata: Metadata = {
  title: 'Cloud-x.in Secure Access | MA Global Network',
  description: 'Securely connect to your Cloud-x.in portal using your assigned security code.',
};

export default function LoginPage() {
  const [securityCode, setSecurityCode] = useState("")
  const { toast } = useToast()

  const handleConnect = (e: FormEvent) => {
    e.preventDefault()
    
    if (securityCode && !isNaN(Number(securityCode))) {
      const url = `https://cloud-x.in:${securityCode}`
      toast({
        title: "Connecting...",
        description: `Redirecting you to ${url}`,
      })
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 1000)
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid security code (port number).",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <Card className="bg-background shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <KeyRound className="h-6 w-6 text-primary" />
              Cloud-x.in Secure Access
            </CardTitle>
            <CardDescription>
              Enter your security code to connect to your portal.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleConnect}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="security-code">Security Code</Label>
                <Input
                  id="security-code"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter your assigned code"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Connect
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
