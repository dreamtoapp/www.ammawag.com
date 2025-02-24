"use client";
import Image from "next/image";
import React, { useState } from "react";

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
  fallbackSrc = "/default-logo.png", // Ensure this is a valid local path
  placeholderText = "No Image Available",
  priority = false, // Default to false unless specified
}) => {
  const [isLoading, setIsLoading] = useState(true); // State to track image loading
  const [hasError, setHasError] = useState(false); // State to track image errors

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "landscape":
        return "aspect-video"; // 16:9
      case "portrait":
        return "aspect-[3/4]"; // 3:4
      default:
        return "aspect-square";
    }
  };

  return (
    <div
      className={`relative w-full h-full ${getAspectRatioClass()} overflow-hidden rounded-md shadow-sm`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {(isLoading || hasError) && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200"
          style={{
            backgroundColor: "var(--muted)",
            color: "var(--muted-foreground)",
          }}
        >
          <span className="text-sm text-gray-500">{placeholderText}</span>
        </div>
      )}
      {/* Image */}
      {imageUrl && !hasError && (
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover object-center transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)} // Hide placeholder when image loads
          onError={(e) => {
            e.currentTarget.src = ""; // Clear the broken image source
            setIsLoading(false); // Stop showing the loader
            setHasError(true); // Mark as errored
          }}
          loading={priority ? "eager" : "lazy"} // Use eager loading if priority is true
          priority={priority} // Add the priority property
        />
      )}
      {/* Fallback Content */}
      {!imageUrl && !isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200"
          style={{
            backgroundColor: "var(--muted)",
            color: "var(--muted-foreground)",
          }}
        >
          <span className="text-sm text-gray-500">{placeholderText}</span>
        </div>
      )}
    </div>
  );
};

export default CardImage;
