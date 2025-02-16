"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

export default function ComingSoonPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 font-cairo gap-5 "
    >
      {/* Main Content */}
      <div className="text-center space-y-6">
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/assets/pdflogo.jpg"
            alt="Coming Soon"
            width={200}
            height={200}
            className="mx-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl font-extrabold text-center text-white animate-pulse mb-4"
        >
          قريبا!
        </motion.h1>

        {/* Description */}

        {/* Animated Button with "Snake" Border Effect */}
        <Link href="/dashboard" passHref>
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="relative inline-block px-8 py-4 text-lg font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg overflow-hidden"
          >
            {/* Snake Border Animation */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-lg"
              style={{
                borderRadius: "inherit",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              variants={{
                hidden: { borderColor: "transparent" },
                show: {
                  borderColor: "white",
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  },
                },
              }}
              initial="hidden"
              animate="show"
            />
            <span> لوحة التحكم</span>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
