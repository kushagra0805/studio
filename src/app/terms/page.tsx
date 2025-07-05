
"use client";

const lastUpdated = 'October 16, 2024';

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>

        <div className="space-y-6 text-foreground">
            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">1. Agreement to Terms</h2>
            <p>By purchasing, accessing, or using the services provided by M A Global Network ("Service," "we," "us," "our"), you ("Client," "you," "your") agree to be bound by these Terms of Service. These terms govern your use of our virtual private servers, dedicated servers, web hosting, server colocation, and specialized Cloud-x.in services. If you do not agree to these terms, you may not use our services.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">2. Service Provision</h2>
            <p>We will provide the services according to the specifications of the plan you have selected. We strive to maintain a high level of service availability, but we do not guarantee that the service will be uninterrupted, error-free, or completely secure.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">3. Client Responsibilities</h2>
            <p>You are solely responsible for:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Maintaining the confidentiality of your account credentials, including passwords.</li>
                <li>All activities that occur under your account.</li>
                <li>The content, management, and security of the data you store on our infrastructure.</li>
                <li>Ensuring your use of the Service complies with all applicable laws and regulations.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">4. Acceptable Use Policy</h2>
            <p>You agree not to use the Service for any unlawful or prohibited activities, including but not to limited to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Hosting or distributing illegal content, such as pirated software, child pornography, or material that infringes on intellectual property rights.</li>
                <li>Sending unsolicited bulk email (spam) or engaging in phishing scams.</li>
                <li>Hosting or running malicious software, such as viruses, malware, or botnets.</li>
                <li>Engaging in activities that cause network abuse, such as denial-of-service (DoS) attacks or excessive resource consumption that negatively impacts other clients.</li>
                <li>Attempting to gain unauthorized access to any system or network.</li>
            </ul>
            <p>We reserve the right to suspend or terminate services immediately for any violation of this policy without prior notice.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">5. Backup and Data Loss</h2>
            <p>For certain services, M A Global Network may perform courtesy backups of client data. Where backups are provided, they are retained for a period of <strong>7 (seven) days</strong>. These backups are provided as a convenience and are not guaranteed. </p>
            <p><strong>It is the Client’s sole responsibility to maintain their own independent backups.</strong> M A Global Network is not liable for any data loss or corruption, regardless of the cause. We strongly recommend that you implement your own comprehensive backup strategy.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">6. Payment and Billing</h2>
            <p>You agree to pay for the services in advance for the billing cycle you have selected. Failure to pay on time may result in the suspension or termination of your services. All payments are non-refundable unless otherwise stated in a specific service agreement.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">7. Limitation of Liability</h2>
            <p>In no event will M A Global Network, its directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including but not to limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">8. Disclaimer of Warranties</h2>
            <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Your use of the Service is at your sole risk. The Service is provided without warranties of any kind, whether express or implied, including, but not to limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">9. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide reasonable notice of any changes by posting the new Terms of Service on this page. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms of Service.</p>
        </div>
      </div>
    </div>
  );
}
