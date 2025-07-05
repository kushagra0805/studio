import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "../components/ui/toaster"
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Chatbot } from '../components/chatbot';
import { CookieBanner } from '../components/cookie-banner';

export const metadata: Metadata = {
  title: {
    default: "M A Global Network - Cloud Services",
    template: "%s | M A Global Network"
  },
  description: 'Your trusted partner for VMs, dedicated servers, colocation, and web hosting.',
  icons: {
    icon: "/logos/m-a-global/favicon.svg",
    apple: "/logos/m-a-global/apple-touch-icon.png",
  }
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
