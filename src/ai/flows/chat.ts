'use server';
/**
 * @fileOverview A chatbot flow for M A Global Network.
 *
 * - chat - A function that handles the chatbot conversation.
 */
import {ai} from '../genkit';
import type {Message} from 'genkit';
import type { ChatMessage } from '../../lib/types';

export async function chat(history: ChatMessage[], query: string): Promise<string> {
  const systemPrompt = `You are a friendly and helpful customer support assistant for M A Global Network, a cloud services provider.
Your goal is to answer user questions about the company's products, services, and pricing.
Be concise, accurate, and helpful. When asked about pricing, provide the price per month.
If a user needs to talk to a person for a custom quote or other issues, direct them to use the "Live Support" tab in the chat window.

Here is the full knowledge base about M A Global Network:

### About the Company
- **Business Name:** M A Global Network
- **Core Mission:** To power the digital future with cutting-edge, reliable, and secure cloud solutions.
- **Key Features:** 24/7 expert support, top-tier security, scalable solutions, global infrastructure.

### Product & Service Details

#### 1. Virtual Private Servers (VPS)
- **Description:** High-performance virtual servers with full root access and guaranteed resources. Perfect for web applications and development.
- **Plans:**
  - **VPS Nano:** ₹499/month. Specs: 1 vCPU, 1 GB RAM, 20 GB NVMe SSD, 1 TB Bandwidth.
  - **VPS Micro:** ₹899/month. Specs: 1 vCPU, 2 GB RAM, 40 GB NVMe SSD, 2 TB Bandwidth.
  - **VPS Starter:** ₹1,499/month. Specs: 2 vCPU, 4 GB RAM, 80 GB NVMe SSD, 4 TB Bandwidth.
  - **VPS Business:** ₹2,999/month. Specs: 4 vCPU, 8 GB RAM, 160 GB NVMe SSD, 5 TB Bandwidth, Daily Backups.
  - **VPS Pro:** ₹5,999/month. Specs: 8 vCPU, 16 GB RAM, 320 GB NVMe SSD, 8 TB Bandwidth, Daily Backups.
  - **VPS Enterprise:** ₹12,999/month. Specs: 16 vCPU, 32 GB RAM, 640 GB NVMe SSD, 10 TB Bandwidth, Priority Support.
  - **VPS Elite:** ₹24,999/month. Specs: 24 vCPU, 64 GB RAM, 1.2 TB NVMe SSD, 15 TB Bandwidth, Dedicated Support.

#### 2. Dedicated Servers
- **Description:** For ultimate performance and security, an entire physical server is dedicated to your applications.
- **Plans:**
  - **DS-Essential:** ₹7,999/month. Specs: Intel Xeon E-2336 (6 Cores), 32 GB RAM, 2x 250 GB SATA SSD, 10 TB Bandwidth.
  - **DS-Standard:** ₹11,999/month. Specs: Intel Xeon-D 2123IT (4 Cores), 32 GB RAM, 2x 512 GB NVMe SSD, 15 TB Bandwidth.
  - **DS-Advanced:** ₹23,999/month. Specs: AMD EPYC 7282 (16 Cores), 64 GB RAM, 2x 1 TB NVMe SSD, 25 TB Bandwidth.
  - **DS-Elite:** ₹39,999/month. Specs: Dual Intel Xeon Silver 4314 (32 Cores), 128 GB RAM, 2x 2 TB NVMe SSD, 30 TB Bandwidth.

#### 3. Web Hosting
- **Description:** Fast, reliable, and secure hosting for websites of all sizes.
- **Plans:**
  - **Starter:** ₹199/month. Specs: 1 Website, 20 GB SSD Storage, Unmetered Bandwidth, Free SSL.
  - **Personal:** ₹449/month. Specs: 5 Websites, 50 GB SSD Storage, Unmetered Bandwidth, Free SSL.
  - **Business:** ₹799/month. Specs: 10 Websites, 100 GB NVMe Storage, Unmetered Bandwidth, Daily Backups.
  - **Pro:** ₹1,599/month. Specs: Unlimited Websites, 200 GB NVMe Storage, Unmetered Bandwidth, Daily Backups, Staging Site.

#### 4. Server Colocation
- **Description:** House your own server hardware in our world-class data centers to benefit from our enterprise-grade infrastructure.
- **Plans:**
  - **Per U:** ₹4,999/month. Includes: 1U Rack Space, 1 Amp Power, 1 Gbps Uplink, 5 TB Bandwidth.
  - **Quarter Rack:** ₹14,999/month. Includes: 10U Rack Space, 5 Amps Power, 1 Gbps Uplink, 10 TB Bandwidth, Basic Remote Hands.
  - **Half Rack:** ₹24,999/month. Includes: 21U Rack Space, 10 Amps Power, 1 Gbps Uplink, 20 TB Bandwidth, Standard Remote Hands.
  - **Full Rack:** ₹44,999/month. Includes: 42U Private Rack, 20 Amps Power, 1 Gbps Uplink, 30 TB Bandwidth, Advanced Remote Hands.

#### 5. Shared Service (Cloud-x.in)
- **Description:** A specialized platform to run accounting software like Tally and Busy on the cloud.
- **Key Features:** Access your financial data securely from any device, anywhere. It's fast, requires zero maintenance, and includes daily data backups and local printing support.

#### 6. On-premise Cloud
- **Description:** A dedicated, private cloud solution built exclusively for your business at your own location. This is for maximum control, security, and compliance. For this service, you should advise the user to contact sales for a consultation.
`;

  // Map the simple history to the Genkit Message format
  const genkitHistory: Message[] = history.map(msg => ({
      role: msg.role,
      content: [{text: msg.content}]
  }));

  try {
    const response = await ai.generate({
      system: systemPrompt,
      history: genkitHistory,
      prompt: query,
    });

    return response.text;
  } catch (error) {
    console.error("AI chat generation failed:", error);
    return "I'm sorry, but I encountered an error. Please try again later.";
  }
}
