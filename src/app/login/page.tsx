
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, User, Server, Download, KeyRound } from "lucide-react";
import { saveAs } from 'file-saver';

const rdpFormSchema = z.object({
  hostname: z.string().min(1, "Hostname or IP address is required."),
  port: z.string().optional(),
  username: z.string().min(1, "Username is required."),
})

export default function LoginPage() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof rdpFormSchema>>({
      resolver: zodResolver(rdpFormSchema),
      defaultValues: {
          hostname: "",
          port: "3389",
          username: "Administrator",
      },
  })

  function onSubmit(data: z.infer<typeof rdpFormSchema>) {
    const { hostname, port, username } = data;
    const fullAddress = port ? `${hostname}:${port}` : hostname;
    
    const rdpFileContent = [
        `full address:s:${fullAddress}`,
        `username:s:${username}`,
        'prompt for credentials:i:1', // Always prompt for password for security
        'authentication level:i:2', // Connect and don't warn me
    ].join('\n');

    const blob = new Blob([rdpFileContent], { type: 'application/rdp;charset=utf-8' });
    saveAs(blob, 'connection.rdp');

    toast({
        title: "RDP File Generated",
        description: "Your RDP connection file has been downloaded. Open it to connect.",
    })
  }

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <motion.div 
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <Monitor className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-bold mt-4">Cloud-x.in RDP Login</CardTitle>
            <CardDescription className="text-lg">
              Enter your connection details to generate an RDP file.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <FormField
                    control={form.control}
                    name="hostname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Server /> Hostname or IP</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 192.168.1.50 or my-vm.cloud-x.in" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port (optional)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Default: 3389" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><User /> Username</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Administrator" {...field} />
                        </FormControl>
                        <FormDescription className="flex items-center gap-1.5 text-xs">
                          <KeyRound className="h-3 w-3" />
                          You will be prompted for your password upon connection.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <Button type="submit" size="lg" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download RDP File
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
