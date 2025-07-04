import type { VmFormData } from "@/components/vm-form";

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

export function generatePowerShellScript(data: VmFormData): string {
    const vmPassword = data.passwordOption === 'random' ? generateRandomPassword() : data.password;

    return `
# HyperAutomate - Generated PowerShell Script
#
# INSTRUCTIONS:
# 1. Save this script as 'create-vm.ps1'.
# 2. Save the generated XML content as 'unattend.xml' in the same directory.
# 3. Create a folder named 'OS_ISOs' and place your Windows Server ISO file inside.
#    Update the '$isoName' variable below to match your ISO file's name.
# 4. Create a folder named 'Deploy' and place any files/folders you want on the new VM's desktop.
# 5. Run this script from an elevated PowerShell terminal.

# --- Configuration ---
$vmName = "${data.vmName}"
$vmStoragePath = "${data.storageLocation.replace(/\\/g, '\\\\')}" # Base path for VMs
$isoPath = ".\\OS_ISOs" # Path to your OS ISOs folder
$isoName = "YOUR_WINDOWS_SERVER.iso" # IMPORTANT: CHANGE THIS to your ISO file name
$deployPath = ".\\Deploy" # Path to the folder to be deployed to the desktop
$vhdPath = Join-Path $vmStoragePath $vmName
$vhdFile = Join-Path $vhdPath "$vmName.vhdx"
$unattendFile = ".\\unattend.xml"

# --- VM Specs ---
$cpuCount = ${data.cpuCores}
$ramBytes = ${data.ram}MB
$diskSizeBytes = ${data.diskSize}GB
$switchName = "${data.networkCard}"
$vmGeneration = 1

# --- Script Start ---

# Check for Administrator privileges
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Warning "This script must be run as Administrator. Please re-run from an elevated PowerShell terminal."
    exit
}

# Validate paths
if (-not (Test-Path $unattendFile)) {
    Write-Error "unattend.xml not found. Make sure it's in the same directory as this script."
    exit
}
$fullIsoPath = Join-Path $isoPath $isoName
if (-not (Test-Path $fullIsoPath)) {
    Write-Error "Windows ISO not found at '$fullIsoPath'. Please check the path and filename."
    exit
}

# Create VM directory
if (-not (Test-Path -Path $vhdPath)) {
    Write-Host "Creating VM directory at $vhdPath..."
    New-Item -Path $vhdPath -ItemType Directory | Out-Null
}

# Create VHDX
if (-not (Test-Path -Path $vhdFile)) {
    Write-Host "Creating new VHDX with size ${data.diskSize}GB..."
    New-VHD -Path $vhdFile -SizeBytes $diskSizeBytes -Dynamic
}

# Create the VM
Write-Host "Creating Virtual Machine '$vmName'..."
New-VM -Name $vmName \`
    -MemoryStartupBytes $ramBytes \`
    -VHDPath $vhdFile \`
    -Path $vhdPath \`
    -Generation $vmGeneration \`
    -SwitchName $switchName

# Set VM resources
Write-Host "Configuring VM resources..."
Set-VM -Name $vmName -ProcessorCount $cpuCount
Set-VMMemory -VMName $vmName -StartupBytes $ramBytes -DynamicMemoryEnabled $false

# Disable checkpoints
Write-Host "Disabling checkpoints..."
Set-VM -Name $vmName -CheckpointType Disabled

# Mount the Windows Installation ISO
Write-Host "Attaching Windows ISO..."
Add-VMScsiController -VMName $vmName
Add-VMDvdDrive -VMName $vmName -Path $fullIsoPath -ControllerNumber 1 -ControllerLocation 0

# Create and mount the unattend/deployment ISO
$autounattendIsoPath = Join-Path $vhdPath "autounattend.iso"
if (Test-Path $autounattendIsoPath) { Remove-Item $autounattendIsoPath }

# Prepare a temp folder for the unattend ISO contents
$tempIsoDir = Join-Path $env:TEMP "iso_temp"
if (Test-Path $tempIsoDir) { Remove-Item $tempIsoDir -Recurse -Force }
New-Item -Path $tempIsoDir -ItemType Directory | Out-Null

# Copy unattend.xml
Copy-Item -Path $unattendFile -Destination (Join-Path $tempIsoDir "autounattend.xml")

# Copy deployment files if they exist
if (Test-Path $deployPath) {
    $deployTargetDir = Join-Path $tempIsoDir "Deploy"
    New-Item -Path $deployTargetDir -ItemType Directory | Out-Null
    Copy-Item -Path (Join-Path $deployPath "*") -Destination $deployTargetDir -Recurse
}

# Create the autounattend ISO. Requires 'Get-CimInstance -ClassName Win32_OperatingSystem' to have CD-burning features.
# This may require installing the "Windows Server Essentials Experience" role.
try {
    Write-Host "Creating autounattend.iso..."
    $isoTool = Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object -ExpandProperty "OperatingSystemSKU"
    if ($isoTool -in (7, 8, 9, 10, 47, 48, 49, 50, 51, 52)) { # SKUs that have burning features
        New-ISOFile -Path $autounattendIsoPath -SourcePath $tempIsoDir
    } else {
        Write-Warning "Could not create ISO automatically. You may need to install the 'Windows Server Essentials Experience' role for the New-ISOFile cmdlet, or create the ISO manually."
        Write-Warning "For now, pausing script. Please manually create an ISO named 'autounattend.iso' in '$vhdPath' containing the 'unattend.xml' and 'Deploy' folder, then press Enter."
        Read-Host
    }
} catch {
     Write-Warning "Could not create ISO automatically. You may need to install the 'Windows Server Essentials Experience' role for the New-ISOFile cmdlet, or create the ISO manually."
     Write-Warning "For now, pausing script. Please manually create an ISO named 'autounattend.iso' in '$vhdPath' containing the 'unattend.xml' and 'Deploy' folder, then press Enter."
     Read-Host
} finally {
    Remove-Item $tempIsoDir -Recurse -Force
}


if(Test-Path $autounattendIsoPath) {
    Write-Host "Attaching autounattend.iso..."
    Add-VMDvdDrive -VMName $vmName -Path $autounattendIsoPath -ControllerNumber 1 -ControllerLocation 1
} else {
    Write-Error "autounattend.iso was not created. Cannot proceed."
    exit
}

# Start the VM
Write-Host "Starting VM '$vmName' to begin automated setup..."
Start-VM -Name $vmName

# --- Password Output ---
${data.passwordOption === 'random' ? `
# The randomly generated password for '$vmName' is: ${vmPassword}
# Saving password to credentials.csv...
$credentialRecord = [PSCustomObject]@{
    VMName = "$vmName"
    Password = "${vmPassword}"
    Timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
}
$credentialRecord | Export-Csv -Path .\\credentials.csv -NoTypeInformation -Append
` : "# Using user-defined password."}

Write-Host "--- VM Creation Process Initiated ---"
Write-Host "The VM will now boot and begin Windows installation automatically."
Write-Host "RDP will be enabled and files deployed as per the unattend.xml configuration."
`;
}

export function generateUnattendXml(data: VmFormData): string {
    const password = data.passwordOption === 'random' ? generateRandomPassword() : data.password;
    
    // Simplified OS Image index mapping
    const osImageMap: { [key: string]: string } = {
        "Windows Server 2012 R2": "2",
        "Windows Server 2016": "2",
        "Windows Server 2019": "2",
        "Windows Server 2022": "2", // Usually "Standard (Desktop Experience)" is index 2
        "Windows Server 2025": "2",
    };
    const imageIndex = osImageMap[data.os] || "2";

    return `<?xml version="1.0" encoding="utf-8"?>
<unattend xmlns="urn:schemas-microsoft-com:unattend">
    <!-- 1. Windows PE Phase -->
    <settings pass="windowsPE">
        <component name="Microsoft-Windows-International-Core-WinPE" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS">
            <SetupUILanguage>
                <UILanguage>en-US</UILanguage>
            </SetupUILanguage>
            <InputLocale>en-US</InputLocale>
            <SystemLocale>en-US</SystemLocale>
            <UILanguage>en-US</UILanguage>
            <UserLocale>en-US</UserLocale>
        </component>
        <component name="Microsoft-Windows-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS">
            <ImageInstall>
                <OSImage>
                    <InstallFrom>
                        <MetaData wcm:action="add">
                            <Key>/IMAGE/NAME</Key>
                            <Value>Windows Server 2022 SERVERSTANDARD</Value> <!-- This value might need adjustment based on your ISO -->
                        </MetaData>
                    </InstallFrom>
                    <InstallTo>
                        <DiskID>0</DiskID>
                        <PartitionID>2</PartitionID>
                    </InstallTo>
                </OSImage>
            </ImageInstall>
            <UserData>
                <ProductKey>
                    <!-- No product key needed for evaluation editions -->
                    <Key></Key>
                </ProductKey>
                <AcceptEula>true</AcceptEula>
                <FullName>Admin</FullName>
                <Organization>HyperAutomate</Organization>
            </UserData>
            <DiskConfiguration>
                <Disk wcm:action="add">
                    <CreatePartitions>
                        <CreatePartition wcm:action="add">
                            <Order>1</Order>
                            <Type>Primary</Type>
                            <Size>500</Size>
                        </CreatePartition>
                        <CreatePartition wcm:action="add">
                            <Order>2</Order>
                            <Type>Primary</Type>
                            <Extend>true</Extend>
                        </CreatePartition>
                    </CreatePartitions>
                    <ModifyPartitions>
                        <ModifyPartition wcm:action="add">
                            <Order>1</Order>
                            <PartitionID>1</PartitionID>
                            <Label>System</Label>
                            <Format>NTFS</Format>
                            <Active>true</Active>
                        </ModifyPartition>
                        <ModifyPartition wcm:action="add">
                            <Order>2</Order>
                            <PartitionID>2</PartitionID>
                            <Label>Windows</Label>
                            <Letter>C</Letter>
                            <Format>NTFS</Format>
                        </ModifyPartition>
                    </ModifyPartitions>
                    <DiskID>0</DiskID>
                    <WillWipeDisk>true</WillWipeDisk>
                </Disk>
            </DiskConfiguration>
        </component>
    </settings>
    <!-- 4. Specialize Phase -->
    <settings pass="specialize">
        <component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS">
            <ComputerName>${data.vmName}</ComputerName>
            <TimeZone>Pacific Standard Time</TimeZone>
        </component>
    </settings>
    <!-- 7. oobeSystem Phase -->
    <settings pass="oobeSystem">
        <component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS">
            <AutoLogon>
                <Password>
                    <Value>${password}</Value>
                    <PlainText>true</PlainText>
                </Password>
                <Enabled>true</Enabled>
                <LogonCount>1</LogonCount>
                <Username>Administrator</Username>
            </AutoLogon>
            <UserAccounts>
                <AdministratorPassword>
                    <Value>${password}</Value>
                    <PlainText>true</PlainText>
                </AdministratorPassword>
            </UserAccounts>
            <OOBE>
                <HideEULAPage>true</HideEULAPage>
                <HideLocalAccountScreen>true</HideLocalAccountScreen>
                <HideOEMRegistrationScreen>true</HideOEMRegistrationScreen>
                <HideOnlineAccountScreens>true</HideOnlineAccountScreens>
                <HideWirelessSetupInOOBE>true</HideWirelessSetupInOOBE>
                <NetworkLocation>Work</NetworkLocation>
                <ProtectYourPC>1</ProtectYourPC>
            </OOBE>
            <FirstLogonCommands>
                 <!-- Command to enable RDP -->
                <SynchronousCommand wcm:action="add">
                    <Order>1</Order>
                    <CommandLine>reg add "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f</CommandLine>
                    <Description>Enable RDP</Description>
                </SynchronousCommand>
                <SynchronousCommand wcm:action="add">
                    <Order>2</Order>
                    <CommandLine>netsh advfirewall firewall set rule group="remote desktop" new enable=Yes</CommandLine>
                    <Description>Enable RDP Firewall Rule</Description>
                </SynchronousCommand>
                <!-- Command to set static IP -->
                <SynchronousCommand wcm:action="add">
                    <Order>3</Order>
                    <CommandLine>powershell.exe -Command "Get-NetAdapter | Where-Object { $_.Status -eq 'Up' } | New-NetIPAddress -IPAddress ${data.ipAddress} -PrefixLength 24 -DefaultGateway 192.168.1.1"</CommandLine>
                    <Description>Set Static IP Address (gateway assumed as .1)</Description>
                </SynchronousCommand>
                <!-- Command to copy deployment folder -->
                <SynchronousCommand wcm:action="add">
                    <Order>4</Order>
                    <CommandLine>powershell.exe -Command "$dvd = Get-VMDvdDrive -VMName \\"${data.vmName}\\" | Where-Object { $_.Path -like '*autounattend.iso' }; $driveLetter = ($dvd | Get-Disk | Get-Partition | Get-Volume).DriveLetter; if ($driveLetter) { Copy-Item -Path \\"$($driveLetter):\\Deploy\\" -Destination \\"C:\\Users\\Administrator\\Desktop\\Deploy\\" -Recurse -Force }"</CommandLine>
                    <Description>Copy Deployment Folder to Desktop</Description>
                </SynchronousCommand>
            </FirstLogonCommands>
        </component>
    </settings>
</unattend>
`;
}
