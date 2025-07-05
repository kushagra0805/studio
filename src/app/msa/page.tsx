
"use client";

const lastUpdated = 'October 16, 2024';

export default function MsaPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Master Service Agreement (MSA)</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
        
        <div className="space-y-6 text-foreground">
            <p>This Master Services Agreement ("Agreement" or "MSA") is entered into by and between M A Global Network ("Company", "we", "us") and the person or entity who has signed up for our Services ("Customer", "you"). This Agreement governs the provision and use of all services offered by M A Global Network (the "Services").</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">1. Services</h2>
            <p>Company agrees to provide the Services as described in the applicable Service Order, subject to the terms of this Agreement, our Acceptable Use Policy (AUP), Privacy Policy, and Service Level Agreement (SLA), all of which are incorporated herein by reference.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">2. Term and Termination</h2>
            <p>The term of this Agreement shall commence on the date the Customer signs up for the Services and shall continue for the period specified in the Service Order ("Initial Term"). Following the Initial Term, this Agreement shall automatically renew for successive periods equal to the Initial Term unless terminated by either party with at least thirty (30) days' written notice prior to the end of the current term.</p>
            <p>Company may terminate this Agreement immediately if the Customer breaches the AUP or fails to make timely payments.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">3. Fees and Payment</h2>
            <p>Customer agrees to pay all fees for the Services as specified in the Service Order. All fees are due in advance of the service period and are non-refundable. Any invoices not paid within ten (10) days of the due date may be subject to a late fee and may result in the suspension or termination of Services.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">4. Confidentiality</h2>
            <p>Each party agrees to maintain the confidentiality of the other party's proprietary information. This includes, but is not limited to, trade secrets, customer lists, and business plans. This obligation shall survive the termination of this Agreement.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">5. Limitation of Liability</h2>
            <p>IN NO EVENT SHALL COMPANY'S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, EXCEED THE TOTAL AMOUNT PAID BY CUSTOMER HEREUNDER IN THE TWELVE (12) MONTHS PRECEDING THE INCIDENT GIVING RISE TO THE LIABILITY.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">6. Disclaimer of Warranties</h2>
            <p>COMPANY PROVIDES THE SERVICES ON AN "AS IS" AND "AS AVAILABLE" BASIS. COMPANY MAKES NO WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">7. Governing Law</h2>
            <p>This Agreement shall be governed by and construed in accordance with the laws of India. Any legal action or proceeding arising under this Agreement will be brought exclusively in the courts located in Delhi, India, and the parties hereby consent to the personal jurisdiction and venue therein.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">8. Entire Agreement</h2>
            <p>This Agreement, including all documents incorporated by reference, constitutes the entire agreement between the parties and supersedes all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning its subject matter.</p>
        </div>
      </div>
    </div>
  );
}
