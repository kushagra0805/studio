
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "../components/ui/toaster"
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Chatbot } from '../components/chatbot';
import { CookieBanner } from '../components/cookie-banner';

export const metadata: Metadata = {
  title: {
    default: "M A Global Network | Enterprise Cloud & Infrastructure Solutions",
    template: "%s | M A Global Network"
  },
  description: 'M A Global Network provides high-performance VPS, Dedicated Servers, Web Hosting, and Shared Server solutions with a 99% Uptime Guarantee.',
  keywords: ['Cloud Hosting India', 'High Performance VPS', 'Dedicated Servers', 'Accounting Shared Server', 'Tally Cloud Hosting', 'Busy Cloud', 'Colocation Services', 'Enterprise IT Infrastructure'],
  authors: [{ name: "Manish Agrawal", url: "https://www.cloud-x.in" }],
  creator: "M A Global Network",
  publisher: "M A Global Network",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.cloud-x.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'M A Global Network | Reliable Cloud Infrastructure',
    description: 'Empowering businesses with world-class cloud infrastructure, 99% uptime, and 24/7 expert support.',
    url: 'https://www.cloud-x.in',
    siteName: 'M A Global Network',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'M A Global Network Cloud Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M A Global Network | Cloud Infrastructure',
    description: 'Scalable VPS, Dedicated Servers, and Shared Server solutions with 99% Uptime.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logos/m-a-global/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for AI & Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "M A Global Network",
    "alternateName": "Cloud-x",
    "url": "https://www.cloud-x.in",
    "logo": "https://www.cloud-x.in/logos/m-a-global/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7024058800",
      "contactType": "customer service",
      "email": "info@cloud-x.in",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "founder": {
      "@type": "Person",
      "name": "Manish Agrawal"
    },
    "description": "Enterprise-grade cloud infrastructure provider specializing in VPS, Dedicated Servers, and Accounting Shared Server solutions for Tally and Busy.",
    "sameAs": [
      "https://www.linkedin.com/company/m-a-global-network"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Cloud Avenue, Tech Park",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452001",
      "addressCountry": "IN"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1" id="main-content">{children}</main>
            <Footer />
        </div>
        <Chatbot />
        <CookieBanner />
        <Toaster />
      </body>
    </html>
  );
}
