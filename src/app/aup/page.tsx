
"use client";

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';

// export const metadata: Metadata = {
//   title: 'Acceptable Use Policy | M A Global Network',
//   description: 'Read the Acceptable Use Policy for M A Global Network, detailing acceptable and prohibited uses of our services.',
// };

export default function AupPage() {
  const [lastUpdated, setLastUpdated] = useState('October 16, 2024');

  // Since we cannot use hooks in metadata, we set a static date
  // and can update it here if needed, though it's better to keep it static
  // for SEO purposes.
  // useEffect(() => {
  //   setLastUpdated(new Date().toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   }));
  // }, []);


  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Acceptable Use Policy (AUP)</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
        
        <div className="space-y-6 text-foreground">
          <p>This Acceptable Use Policy ("AUP") document, including the following list of Prohibited Activities, is an integral part of your hosting agreement with M A Global Network. If you engage in any of the activities prohibited by this AUP document, M A Global Network may suspend or terminate your account.</p>

          <p>M A Global Network's AUP is designed to protect M A Global Network, its customers, and the general Internet community from irresponsible or, in some cases, illegal activities. The AUP is a non-exclusive list of the actions prohibited by M A Global Network.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Prohibited Uses of M A Global Network Systems and Services</h2>
          <ol className="list-decimal list-inside space-y-4 pl-4">
            <li>
              <strong>Illegal Use:</strong> M A Global Network's services may not be used for illegal purposes, or in support of illegal activities. M A Global Network reserves the right to cooperate with legal authorities and/or injured third parties in the investigation of any suspected crime or civil wrong.
            </li>
            <li>
              <strong>Harm to Minors:</strong> Use of the M A Global Network service to harm, or attempt to harm, minors in any way, including, but not limited to child pornography or child abuse.
            </li>
            <li>
              <strong>Spamming and Unsolicited Email:</strong> Sending unsolicited bulk and/or commercial messages over the Internet (known as "spamming"). It is not only harmful because of its negative impact on consumer attitudes toward M A Global Network, but also because it can overload M A Global Network's network and disrupt service to M A Global Network's customers.
            </li>
            <li>
              <strong>Intellectual Property Violations:</strong> Engaging in any activity that infringes or misappropriates the intellectual property rights of others, including copyrights, trademarks, service marks, trade secrets, software piracy, and patents held by individuals, corporations, or other entities.
            </li>
            <li>
              <strong>Network Disruptions and Malicious Activity:</strong> Any activities that disrupt the services or performance of M A Global Network or its customers. This includes, but is not limited to, Denial of Service (DoS) attacks, running botnets, hosting phishing sites, and distributing malware.
            </li>
            <li>
              <strong>Resource Abuse:</strong> Any use of the service that results in excessive consumption of server resources, including CPU, memory, and disk I/O, that negatively impacts the performance of other customers on shared infrastructure. This includes activities like cryptocurrency mining on non-dedicated resources.
            </li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Reporting Violations</h2>
          <p>If you have a complaint regarding a violation of this AUP by one of our customers, please contact us with detailed information about the alleged violation. We will investigate all complaints and take appropriate action.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Revisions to This AUP</h2>
          <p>M A Global Network reserves the right to revise, amend, or modify this AUP at any time and in any manner. Notice of any revision, amendment, or modification will be posted on this page.</p>
        </div>
      </div>
    </div>
  );
}
