
import type {Metadata} from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import { Toaster } from "../components/ui/toaster"
import { Header } from '../components/header';
import { Footer } from '../components/footer';

const Chatbot = dynamic(() => import('../components/chatbot').then(mod => mod.Chatbot), { ssr: false });
const CookieBanner = dynamic(() => import('../components/cookie-banner').then(mod => mod.CookieBanner), { ssr: false });


export const metadata: Metadata = {
  title: {
    default: "M A Global Network - Cloud Services",
    template: "%s | M A Global Network"
  },
  description: 'Your trusted partner for VMs, dedicated servers, colocation, and web hosting.',
  icons: {
    icon: "/logos/m-a-global/favicon.svg",
  },
  openGraph: {
    title: 'M A Global Network - Cloud Services',
    description: 'Powering Your Digital Future with Cutting-Edge, Reliable, and Secure Cloud Solutions.',
    url: 'https://www.your-domain.com', // IMPORTANT: Replace with your actual domain
    siteName: 'M A Global Network',
    images: [
      {
        url: 'https://www.your-domain.com/images/og-image.png', // IMPORTANT: Create and place this image
        width: 1200,
        height: 630,
        alt: 'M A Global Network Cloud Infrastructure',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M A Global Network - Cloud Services',
    description: 'Powering Your Digital Future with Cutting-Edge, Reliable, and Secure Cloud Solutions.',
    images: ['https://www.your-domain.com/images/og-image.png'], // IMPORTANT: Create and place this image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
        <Chatbot />
        <CookieBanner />
        <Toaster />
      </body>
    </html>
  );
}
