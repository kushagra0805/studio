"use client"

import { useState } from "react"
import { VmForm, type VmFormData } from "@/components/vm-form"
import { ScriptDisplay } from "@/components/script-display"
import { generatePowerShellScript, generateUnattendXml } from "@/lib/script-generator"
import { Bot } from "lucide-react"
import JSZip from "jszip"
import { saveAs } from "file-saver"

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
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  const handleFormSubmit = async (data: VmFormData) => {
    let formData = { ...data };
    if (formData.passwordOption === 'random') {
      formData.password = generateRandomPassword();
    }
    const ps1Script = generatePowerShellScript(formData)
    const xmlScript = generateUnattendXml(formData)
    
    setDownloadInitiated(false); // Reset in case of re-submission

    const zip = new JSZip();
    zip.file("create-vm.ps1", ps1Script);
    zip.file("unattend.xml", xmlScript);
    zip.folder("OS_ISOs");
    zip.folder("Deploy");

    const readmeContent = `HyperAutomate Deployment Package
================================

Thank you for using HyperAutomate!

Instructions:
1. Unzip this package to a folder on your Hyper-V server (e.g., C:\\HyperV-Automation).
2. Place your Windows Server ISO file inside the 'OS_ISOs' folder.
3. IMPORTANT: Open 'create-vm.ps1' and update the '$isoName' variable on line 13 to match your ISO's filename.
4. (Optional) Place any files or folders you want to have on the new VM's desktop into the 'Deploy' folder.
5. Open PowerShell as an Administrator, navigate to this folder, and run the script: .\\create-vm.ps1

The script will create and configure your VM. If you chose a random password, it will be displayed in the console and saved to 'credentials.csv'.
`;
    zip.file("README.txt", readmeContent);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${formData.vmName}-automation-package.zip`);
    setDownloadInitiated(true);
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold font-headline text-primary">
          <Bot className="h-10 w-10" />
          HyperAutomate
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Configure your virtual machine and generate your automation package instantly.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <div className="mb-8 lg:mb-0">
          <VmForm onSubmit={handleFormSubmit} />
        </div>
        <div>
          <ScriptDisplay downloadInitiated={downloadInitiated} />
        </div>
      </div>
    </main>
  )
}
