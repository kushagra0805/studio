# **App Name**: HyperAutomate

## Core Features:

- GUI Parameter Input: Provides a GUI for entering VM configuration parameters (VM name, disk size, RAM, CPU cores).
- Dynamic Dropdowns: Offers dropdown menus for storage locations, virtual network cards, and OS selection, dynamically populated from the server environment.
- Password Management: Includes options for random or user-defined VM passwords, with automatic storage of random passwords in an Excel file.
- Automated VM Creation: Handles automatic VM creation with specified parameters, including disk size, RAM, CPU cores, static IP address, and OS selection.
- VM Configuration: Sets up the VM with enabled RDP, disables checkpoints, and ensures a Gen 1 VM build.
- Automated Folder Deployment: Deploys a specified folder to the desktop of the created VM automatically.
- OS Installation Automation: Automates the OS installation process by automatically selecting the language and "Standard with GUI" options, removing the need for manual interaction.

## Style Guidelines:

- Primary color: Deep indigo (#4B0082), evoking automation and reliability.
- Background color: Very light indigo (#F0F8FF) to ensure comfortable readability with a dark color scheme.
- Accent color: Vibrant violet (#8A2BE2) for emphasis and call to action elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif, for a modern, machined, objective, neutral look, and because it is suitable for both headlines and body text.
- Code font: 'Source Code Pro' for displaying code snippets in the PowerShell scripts.
- Use clean, professional icons to represent VM parameters and actions.
- Design a clear, structured layout with logical grouping of VM configuration options.