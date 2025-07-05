
"use client";

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';

// export const metadata: Metadata = {
//   title: 'Privacy Policy | M A Global Network',
//   description: 'Read the Privacy Policy for M A Global Network, detailing how we collect, use, and protect your data.',
// };

export default function PrivacyPage() {
  const [lastUpdated, setLastUpdated] = useState('October 16, 2024');

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
        
        <div className="space-y-6 text-foreground">
            <p>M A Global Network ("us", "we", "our") operates the M A Global Network website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">Types of Data Collected</h3>
            <h4 className='font-semibold'>Personal Data</h4>
            <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Cookies and Usage Data</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Use of Data</h2>
            <p>M A Global Network uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Security of Data</h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us by visiting the contact page on our website.</p>
        </div>
      </div>
    </div>
  );
}
