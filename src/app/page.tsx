"use client"

import { useState } from "react"
import { VmForm, type VmFormData } from "@/components/vm-form"
import { ScriptDisplay } from "@/components/script-display"
import { generatePowerShellScript, generateUnattendXml } from "@/lib/script-generator"
import { Bot } from "lucide-react"

const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 14; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Ensure password has at least one of each required type
    if (!/[a-z]/.test(password)) password += 'a';
    if (!/[A-Z]/.test(password)) password += 'Z';
    if (!/\d/.test(password)) password += '1';
    if (!/[!@#$%^&*()]/.test(password)) password += '!';
    return password.slice(0, 14);
}

export default function Home() {
  const [scripts, setScripts] = useState<{ ps1: string; xml: string } | null>(null)

  const handleFormSubmit = (data: VmFormData) => {
    let formData = { ...data };
    if (formData.passwordOption === 'random') {
      formData.password = generateRandomPassword();
    }
    const ps1Script = generatePowerShellScript(formData)
    const xmlScript = generateUnattendXml(formData)
    setScripts({ ps1: ps1Script, xml: xmlScript })
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold font-headline text-primary">
          <Bot className="h-10 w-10" />
          HyperAutomate
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Configure your virtual machine and generate the PowerShell automation script instantly.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <div className="mb-8 lg:mb-0">
          <VmForm onSubmit={handleFormSubmit} />
        </div>
        <div>
          <ScriptDisplay scripts={scripts} />
        </div>
      </div>
    </main>
  )
}
