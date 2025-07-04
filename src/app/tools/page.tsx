
"use client"

import { useState } from "react"
import { VmForm, type VmFormData } from "@/components/vm-form"
import { ScriptDisplay } from "@/components/script-display"
import { generatePowerShellScript, generateUnattendXml } from "@/lib/script-generator"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { motion } from "framer-motion"

// Helper to generate a random password
function generateRandomPassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    let password = ""
    for (let i = 0, n = charset.length; i < n; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n))
    }
    // Ensure password meets complexity requirements if any, this is a simple generator
    return password
}

export default function VmAutomationPage() {
  const [downloadInitiated, setDownloadInitiated] = useState(false)

  const handleSubmit = (data: VmFormData) => {
    let finalData = { ...data };

    if (finalData.passwordOption === "random") {
      finalData.password = generateRandomPassword();
    }
    
    // Ensure password is not undefined for the scripts
    if (!finalData.password) {
        console.error("Password is not defined.");
        return;
    }

    const powershellScript = generatePowerShellScript(finalData)
    const unattendXml = generateUnattendXml(finalData)
    const readmeText = `
HyperAutomate Deployment Package
================================

Thank you for using the VM Automation tool.

Instructions:
1. Unzip this package to a convenient location on your Hyper-V host server (e.g., C:\\HyperV-Automation).
2. Place your Windows Server ISO file inside the 'OS_ISOs' folder.
3. VERY IMPORTANT: Open the 'create-vm.ps1' script in a text editor. On line 13, change "YOUR_WINDOWS_SERVER.iso" to the exact filename of your ISO file.
4. (Optional) Place any files or folders you want to be copied to the new VM's Administrator desktop into the 'Deploy' folder.
5. Open PowerShell AS AN ADMINISTRATOR.
6. Navigate to the folder where you unzipped these files (e.g., cd C:\\HyperV-Automation).
7. Run the script by typing: .\\create-vm.ps1

Your VM will be created and the Windows installation will proceed automatically. 
If you chose to generate a random password, it will be saved in a 'credentials.csv' file in this same folder upon script completion.
`

    const zip = new JSZip()
    zip.file("create-vm.ps1", powershellScript)
    zip.file("unattend.xml", unattendXml)
    zip.file("README.txt", readmeText)
    zip.folder("OS_ISOs")
    zip.folder("Deploy")

    zip.generateAsync({ type: "blob" }).then(content => {
      saveAs(content, `${data.vmName}-Automation-Package.zip`)
      setDownloadInitiated(true)
    })
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Hyper-V VM Automation
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
            Configure your virtual machine below, and we'll generate a complete PowerShell deployment package to build it automatically on your Hyper-V server.
          </p>
        </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <VmForm onSubmit={handleSubmit} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-full sticky top-24"
        >
          <ScriptDisplay downloadInitiated={downloadInitiated} />
        </motion.div>
      </div>
    </div>
  )
}
