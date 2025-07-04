'use server';
/**
 * @fileOverview A chatbot flow for MA Global Network.
 *
 * - chat - A function that handles the chatbot conversation.
 */
import {ai} from '@/ai/genkit';
import type {Message} from 'genkit';
import type { ChatMessage } from '@/lib/types';

export async function chat(history: ChatMessage[], query: string): Promise<string> {
  const systemPrompt = `You are a friendly and helpful customer support assistant for MA Global Network, a cloud services provider.
Your goal is to answer user questions about the company's products and services.
Be concise and helpful.

Here is information about MA Global Network:
- **Business Name:** MA Global Network
- **Services:**
  - Virtual Private Servers (VPS): Scalable and powerful virtual servers.
  - Dedicated Servers: For high-performance and security needs.
  - Server Colocation: Housing customer servers in their data centers.
  - Web Hosting: For websites of all sizes.
  - Cloud-x.in: A specialized platform for running accounting software like Tally and Busy in the cloud.
- **Key Features:** 24/7 expert support, top-tier security, scalable solutions, global infrastructure.
- **Contact:** For pricing details or custom quotes, users should visit the contact page.
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
