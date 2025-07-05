"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'ma_global_cookie_consent';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This effect runs only on the client side
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-t p-4 shadow-lg"
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-primary shrink-0" />
              <p className="text-sm text-foreground">
                We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies. Read our{' '}
                <Link href="/privacy" className="font-semibold underline hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <Button onClick={handleAccept} size="sm">
              Accept
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
