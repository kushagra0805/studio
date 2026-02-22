
"use client";

import { useEffect, useState } from 'react';

export default function ColocationPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated('October 16, 2024');
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Colocation Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
        
        <div className="space-y-6 text-foreground">
            <p>This Colocation Policy applies to all customers ("Customer", "you") who lease space and services to house their own equipment in a M A Global Network ("Company", "we", "us") data center facility. This policy is an addendum to the Master Service Agreement (MSA) and Acceptable Use Policy (AUP).</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">1. Data Center Access</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Access to the data center is restricted to authorized personnel only. Customers must provide a list of authorized individuals who may access their equipment.</li>
                <li>All access requests must be scheduled at least 24 hours in advance through our customer portal, except in cases of emergency.</li>
                <li>All visitors must present valid, government-issued photo identification upon arrival and will be escorted by a Company staff member at all times.</li>
                <li>Customers are prohibited from accessing any equipment other than their own.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">2. Equipment and Installation</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Customer is solely responsible for the installation, maintenance, and removal of their equipment. Company staff can provide "Remote Hands" services for a fee.</li>
                <li>All equipment must be rack-mountable and conform to standard 19-inch rack specifications.</li>
                <li>Customer must provide all necessary cabling for their equipment. All cabling must be neatly managed and must not obstruct walkways or access to other customers' equipment.</li>
                <li>The Customer is responsible for ensuring their equipment does not exceed the power and cooling capacity allocated in their Service Order.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">3. Shipping and Receiving</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>The Company can accept shipments of equipment on behalf of the Customer. The Customer must notify the Company in advance of any expected deliveries.</li>
                <li>The Company is not liable for any damage to equipment that occurs during shipping. The Customer is responsible for insuring their equipment in transit.</li>
                <li>Equipment may be stored temporarily for a limited time before installation. Storage fees may apply for extended periods.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">4. Security</h2>
            <p>While the Company provides extensive physical security for the data center facility, the Customer is solely responsible for the security of their own equipment and data. This includes implementing firewalls, access controls, and other necessary security measures on their servers.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">5. Prohibited Items</h2>
            <p>The following items are strictly prohibited within the data center facility:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Flammable or hazardous materials.</li>
                <li>Food and beverages in the data hall.</li>
                <li>Cardboard, paper, or other combustible packing materials.</li>
                <li>Any equipment not specified in the Service Order without prior approval.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">6. Remote Hands Services</h2>
            <p>The Company offers "Remote Hands" services to assist with tasks such as rebooting servers, checking cable connections, and providing visual feedback. These services are available 24/7 and are billed at an hourly rate, with a minimum charge per incident. Details are available in the customer portal.</p>
        </div>
      </div>
    </div>
  );
}
