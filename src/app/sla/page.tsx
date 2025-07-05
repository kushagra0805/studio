
"use client";

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';

// export const metadata: Metadata = {
//   title: 'Service Level Agreement | M A Global Network',
//   description: 'Read the Service Level Agreement for M A Global Network, detailing our commitments to service availability and performance.',
// };

export default function SlaPage() {
  const [lastUpdated, setLastUpdated] = useState('October 16, 2024');

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Service Level Agreement (SLA)</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>

        <div className="space-y-6 text-foreground">
            <p>This Service Level Agreement ("SLA") is a part of the Master Service Agreement ("MSA") between M A Global Network ("we", "us") and you ("Customer", "you"). This SLA defines the service level commitments for the services provided by M A Global Network.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">1. Network Uptime Guarantee</h2>
            <p>M A Global Network guarantees a <strong>99% network uptime</strong>. Network uptime refers to the availability of our network infrastructure, including routers, switches, and cabling. This guarantee applies to the portion of the network from the outbound port of our edge routers to the outbound port of the data center.</p>
            <p>The network uptime guarantee does not cover downtime caused by:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Scheduled maintenance windows, for which we will provide at least 24 hours' notice.</li>
                <li>Emergency maintenance required to address security vulnerabilities or critical system issues.</li>
                <li>Customer-caused outages, including misconfigurations, script errors, or security breaches of the customer's account.</li>
                <li>Force majeure events, including but not limited to acts of God, war, terrorism, natural disasters, and government actions.</li>
                <li>Failures of third-party networks or services outside of M A Global Network's direct control.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">2. Server Hardware Guarantee</h2>
            <p>For Dedicated Server clients, M A Global Network guarantees that all server hardware components will be functional. In the event of a hardware failure, we will replace the faulty component within <strong>4 (four) hours</strong> of identifying the issue. This guarantee applies to the CPU, RAM, motherboard, hard drives, and power supply.</p>
            <p>This guarantee does not cover software-related issues, data loss, or data recovery. Customers are responsible for their own data backups.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">3. Credit for Downtime</h2>
            <p>If we fail to meet the 99% network uptime guarantee in a given calendar month, you may be eligible for a service credit. To receive a credit, you must submit a ticket to our support department within 7 days of the end of the month in which the downtime occurred.</p>
            <p>Service credits are calculated as follows:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>98.0% to 98.99% uptime:</strong> 5% of your monthly fee for the affected service.</li>
                <li><strong>95.0% to 97.99% uptime:</strong> 10% of your monthly fee for the affected service.</li>
                <li><strong>Below 95.0% uptime:</strong> 25% of your monthly fee for the affected service.</li>
            </ul>
            <p>The maximum credit for any given month will not exceed 50% of your monthly fee for the affected service. Credits are applied to your next invoice and are not redeemable for cash.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">4. Support Response Time</h2>
            <p>M A Global Network is committed to providing timely support. We aim to provide an initial response to support tickets within the following timeframes:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Emergency/Critical Issues (Service Down):</strong> Within 1 hour.</li>
                <li><strong>High Priority Issues:</strong> Within 4 hours.</li>
                <li><strong>Normal/Low Priority Issues:</strong> Within 24 hours.</li>
            </ul>
            <p>These response times are goals and not a guarantee. Resolution time will vary depending on the complexity of the issue.</p>
        </div>
      </div>
    </div>
  );
}
