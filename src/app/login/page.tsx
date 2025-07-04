"use client"

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
import { ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [securityCode, setSecurityCode] = useState("")

  const handleConnect = (e: FormEvent) => {
    e.preventDefault()
    if (securityCode && !isNaN(Number(securityCode))) {
      window.location.href = `https://cloud-x.in:${securityCode}`
    } else {
      // You could add a toast notification here for invalid input
      console.error("Invalid security code entered.")
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Cloud-x.in Secure Access
            </CardTitle>
            <CardDescription>
              Please enter your security code to connect to your service.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleConnect}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="security-code">Security Code</Label>
                <Input
                  id="security-code"
                  type="text"
                  placeholder="Enter your assigned code"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  required
                  pattern="\d*"
                  title="Please enter a valid port number."
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
