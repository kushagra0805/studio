"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, FileCode, FileText, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface ScriptDisplayProps {
  scripts: { ps1: string; xml: string } | null
}

export function ScriptDisplay({ scripts }: ScriptDisplayProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState<"ps1" | "xml" | null>(null)

  const handleCopy = (text: string | null, type: "ps1" | "xml") => {
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: `The ${type === "ps1" ? "PowerShell script" : "XML config"} is ready to use.`,
      })
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  if (!scripts) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center shadow-lg">
        <CardHeader>
          <CardTitle>Generated Scripts</CardTitle>
          <CardDescription>
            Your PowerShell and XML configuration files will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center">
            <FileCode className="h-24 w-24 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            Complete the form to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>Your Automation Scripts</CardTitle>
        <CardDescription>
          Use these files to create and configure your virtual machine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="powershell" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="powershell">
              <FileCode className="mr-2 h-4 w-4" />
              create-vm.ps1
            </TabsTrigger>
            <TabsTrigger value="xml">
              <FileText className="mr-2 h-4 w-4" />
              unattend.xml
            </TabsTrigger>
          </TabsList>
          <TabsContent value="powershell">
            <div className="relative mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7"
                onClick={() => handleCopy(scripts.ps1, "ps1")}
              >
                {copied === "ps1" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy PowerShell Script</span>
              </Button>
              <pre className="bg-muted/50 rounded-md p-4 max-h-[500px] overflow-auto">
                <code className="font-code text-sm text-foreground">
                  {scripts.ps1}
                </code>
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="xml">
            <div className="relative mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7"
                onClick={() => handleCopy(scripts.xml, "xml")}
              >
                {copied === "xml" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy XML Config</span>
              </Button>
              <pre className="bg-muted/50 rounded-md p-4 max-h-[500px] overflow-auto">
                <code className="font-code text-sm text-foreground">
                  {scripts.xml}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
