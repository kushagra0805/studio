
"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className="h-8 w-8 text-white"
    fill="currentColor"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.8-26.7l-7-4.1-72.2 18.9L46.4 358l-4.5-7.3c-18.9-30.8-28.5-66.3-28.5-102.9 0-110.4 89.6-199.9 199.9-199.9 54.4 0 105.7 21.2 143.2 58.7 37.5 37.5 58.7 88.8 58.7 143.2 0 110.3-89.6 199.9-199.9 199.9zM196.4 179.9c-2.4-5.3-5.2-5.6-8.8-5.8-3.1-.2-6.6-.2-10.2.1-3.6.3-9.5 1.4-14.5 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6-5.5-2.7-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.7-23.2-8.5-44.2-27.1-16.3-14.5-27.3-32.5-30.4-37.9-3.1-5.6-.3-8.8 2.5-11.6 2.4-2.4 5.3-6.5 8-8.5 2.7-2.1 3.6-3.7 5.3-6.2 1.7-2.5 1-5 .1-6.9z" />
  </svg>
)

export function WhatsAppChat() {
  const phoneNumber = "911234567890"; // Placeholder: Replace with your number
  const message = "Hello, I'm interested in your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.7,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <button
            className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon />
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
