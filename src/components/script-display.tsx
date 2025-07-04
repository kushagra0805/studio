
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, FileCode, Terminal } from "lucide-react"

interface ScriptDisplayProps {
  downloadInitiated: boolean
}

export function ScriptDisplay({ downloadInitiated }: ScriptDisplayProps) {
  if (!downloadInitiated) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center shadow-lg">
        <CardHeader>
          <CardTitle>Automation Package</CardTitle>
          <CardDescription>
            Your downloadable package will be ready once you complete the form.
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
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle />
          Package Downloaded!
        </CardTitle>
        <CardDescription>
          Follow these steps on your Hyper-V server to deploy your VM.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Next Steps on Your Hyper-V Server</AlertTitle>
          <AlertDescription>
            <ol className="list-decimal list-inside space-y-3 mt-2">
              <li>
                Transfer and unzip the downloaded package to a folder (e.g.,{" "}
                <code className="font-code bg-muted px-1 py-0.5 rounded">C:\\HyperV-Automation</code>).
              </li>
              <li>
                Place your Windows Server ISO file inside the{" "}
                <code className="font-code bg-muted px-1 py-0.5 rounded">OS_ISOs</code> folder.
              </li>
              <li>
                <strong>Important:</strong> Open the{" "}
                <code className="font-code bg-muted px-1 py-0.5 rounded">create-vm.ps1</code> script and update the{" "}
                <code className="font-code bg-muted px-1 py-0.5 rounded">$isoName</code> variable on line 13 to match your ISO's filename.
              </li>
               <li>
                (Optional) Place any files you want on the new VM's desktop into the{" "}
                <code className="font-code bg-muted px-1 py-0.5 rounded">Deploy</code> folder.
              </li>
              <li>
                Open PowerShell <strong>as an Administrator</strong>, navigate to your folder, and run the script:{" "}
                <code className="font-code bg-muted px-1 py-0.5 rounded">.\\create-vm.ps1</code>
              </li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              Your VM will now be created in Hyper-V Manager. If you chose a random password, it will be saved in a{" "}
              <code className="font-code bg-muted px-1 py-0.5 rounded">credentials.csv</code> file.
            </p>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
