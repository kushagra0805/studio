
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  Cpu,
  Disc3,
  HardDrive,
  KeyRound,
  MemoryStick,
  Network,
  Server,
  Wrench,
  Globe,
  Download,
} from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  vmName: z.string().min(1, "VM name is required.").max(50),
  diskSize: z.number().min(20, "Disk must be at least 20GB.").max(2048),
  ram: z.number().min(1024, "RAM must be at least 1024MB.").max(65536),
  cpuCores: z.number().min(1, "Must have at least 1 core.").max(64),
  storageLocation: z.string().min(1, "Storage location is required."),
  networkCard: z.string().min(1, "Network card is required."),
  os: z.string().min(1, "Operating system is required."),
  passwordOption: z.enum(["random", "defined"]),
  password: z.string().optional(),
  ipAddress: z.string().ip({ version: "v4", message: "Invalid IPv4 address." }),
  gateway: z.string().ip({ version: "v4", message: "Invalid IPv4 address." }),
}).refine(data => {
    if (data.passwordOption === 'defined') {
        return data.password && data.password.length >= 8;
    }
    return true;
}, {
    message: "Password must be at least 8 characters long.",
    path: ["password"],
});


export type VmFormData = z.infer<typeof formSchema>

interface VmFormProps {
  onSubmit: (data: VmFormData) => void
}

export function VmForm({ onSubmit }: VmFormProps) {
  const [passwordOption, setPasswordOption] = useState<"random" | "defined">("random")

  const form = useForm<VmFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vmName: "MyNewVM",
      diskSize: 60,
      ram: 4096,
      cpuCores: 2,
      storageLocation: "C:\\VMs",
      networkCard: "Default Switch",
      os: "Windows Server 2022",
      passwordOption: "random",
      password: "",
      ipAddress: "192.168.1.100",
      gateway: "192.168.1.1",
    },
  })

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          VM Configuration
        </CardTitle>
        <CardDescription>
          Fill out the details below to generate your PowerShell script.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="vmName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Server />VM Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., WebServer01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="storageLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><HardDrive />Storage Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a drive" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="C:\\VMs">C:\\VMs</SelectItem>
                        <SelectItem value="D:\\VMs">D:\\VMs</SelectItem>
                        <SelectItem value="E:\\VirtualMachines">E:\\VirtualMachines</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="cpuCores"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Cpu />CPU Cores: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={64}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><MemoryStick />RAM (MB): {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1024}
                      max={65536}
                      step={1024}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="diskSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Disc3 />Disk Size (GB): {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={20}
                      max={2048}
                      step={10}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="os"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Server />Operating System</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an OS" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Windows Server 2012 R2">Windows Server 2012 R2</SelectItem>
                        <SelectItem value="Windows Server 2016">Windows Server 2016</SelectItem>
                        <SelectItem value="Windows Server 2019">Windows Server 2019</SelectItem>
                        <SelectItem value="Windows Server 2022">Windows Server 2022</SelectItem>
                        <SelectItem value="Windows Server 2025">Windows Server 2025</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="networkCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Network />Virtual Network</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a network" />
                        </Trigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Default Switch">Default Switch</SelectItem>
                        <SelectItem value="External Network">External Network</SelectItem>
                        <SelectItem value="Internal Only">Internal Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                 <FormField
                    control={form.control}
                    name="ipAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Globe />Static IPv4 Address</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 192.168.1.100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gateway"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">Default Gateway</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 192.168.1.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
             </div>


            <Separator />
            
            <FormField
              control={form.control}
              name="passwordOption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2"><KeyRound />VM Password</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value: "random" | "defined") => {
                        field.onChange(value)
                        setPasswordOption(value)
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="random" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Generate a random password
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="defined" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Define a password
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {passwordOption === 'defined' && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Min. 8 characters" {...field} />
                    </FormControl>
                    <FormDescription>
                      This password will be used for the Administrator account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" size="lg" className="w-full mt-8">
              <Download className="mr-2" />
              Generate & Download Package
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
