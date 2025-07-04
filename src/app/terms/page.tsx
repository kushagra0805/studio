import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | MA Global Network',
  description: 'Read the Terms of Service for using MA Global Network products and services.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="prose prose-blue dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using the services provided by MA Global Network ("Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Service Description</h2>
        <p>Our Service provides users with access to a rich collection of resources, including but not limited to, virtual private servers, dedicated servers, web hosting, and other cloud infrastructure services. You understand and agree that the Service may include certain communications from us, such as service announcements and administrative messages, and that these communications are considered part of your subscription and you will not be able to opt out of receiving them.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. User Responsibilities</h2>
        <p>You are responsible for all activity occurring under your user accounts and shall abide by all applicable local, state, national and foreign laws, treaties and regulations in connection with your use of the Service, including those related to data privacy, international communications and the transmission of technical or personal data. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">4. Acceptable Use Policy</h2>
        <p>You agree not to use the Service to:</p>
        <ul className="list-disc list-inside space-y-2">
            <li>Engage in any illegal activities.</li>
            <li>Transmit any material that is abusive, harassing, defamatory, vulgar, or otherwise objectionable.</li>
            <li>Send unsolicited advertising or "spam".</li>
            <li>Transmit any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Disclaimer of Warranties</h2>
        <p>The Service is provided "as is". We and our suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither we nor our suppliers and licensors, makes any warranty that the Service will be error free or that access thereto will be continuous or uninterrupted.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
        <p>In no event will MA Global Network, or its suppliers or licensors, be liable with respect to any subject matter of this agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for interruption of use or loss or corruption of data.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace any part of this Agreement. It is your responsibility to check this Agreement periodically for changes. Your continued use of or access to the Service following the posting of any changes to this Agreement constitutes acceptance of those changes.</p>
      </div>
    </div>
  );
}
