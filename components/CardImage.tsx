"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface CardImageProps {
  imageUrl: string | null | undefined; // Allow undefined
  altText: string;
  width?: string;
  height?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
  fallbackSrc?: string;
  placeholderText?: string;
  priority?: boolean; // Add a priority prop to control prioritization
}

const CardImage: React.FC<CardImageProps> = ({
  imageUrl,
  altText,
  width = "100%",
  height = "auto",
  aspectRatio = "square",
  fallbackSrc = "/default-logo.png",
  placeholderText = "No Image Available",
  priority = false, // Default to false unless specified
}) => {
  const [isLoading, setIsLoading] = useState(true); // State to track image loading

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "landscape":
        return "aspect-video";
      case "portrait":
        return "aspect-[3/4]";
      default:
        return "aspect-square";
    }
  };

  return (
    <motion.div
      className={`relative w-${width} h-${height} ${getAspectRatioClass()} overflow-hidden rounded-md shadow-sm`}
      style={{ width, height }}
      initial={{ opacity: 0, scale: 0.8 }} // Start small and invisible
      animate={{ opacity: 1, scale: 1 }} // Animate to full size and visible
      transition={{
        duration: 0.6, // Duration of the animation
        ease: "easeOut", // Smooth easing function
        delay: 0.2, // Slight delay to catch the eye
      }}
      whileHover={{ scale: 1.05 }} // Slightly zoom in on hover
    >
      {/* Skeleton Loader */}
      {isLoading && (
        <div className="animate-pulse w-full h-full bg-gray-300 rounded-md" />
      )}

      {/* Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover object-center transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)} // Use onLoad instead of onLoadingComplete
          onError={(e) => {
            e.currentTarget.src = fallbackSrc;
            setIsLoading(false); // Ensure loading state is reset on error
          }}
          loading="lazy"
          priority={priority} // Add the priority property
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">{placeholderText}</span>
        </div>
      )}
    </motion.div>
  );
};

export default CardImage;
