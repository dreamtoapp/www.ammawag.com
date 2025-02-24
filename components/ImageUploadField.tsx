"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface ImageUploadFieldProps {
  label: string;
  previewUrl: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Optional error message for validation feedback
  width?: number; // Optional width for the preview container (default: 150)
  height?: number; // Optional height for the preview container (default: 150)
}

export default function ImageUploadField({
  label,
  previewUrl,
  onChange,
  error,
  width = 150, // Default width
  height = 150, // Default height
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-4">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* File Input */}
      <Input type="file" accept="image/*" onChange={onChange} />

      {/* Image Preview Container */}
      <div
        className="relative flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-300"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            fill // Automatically fills the parent container
            sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizing for performance
            priority={false} // Lazy load by default
            className="object-cover rounded-lg transition-transform duration-300 hover:scale-105" // Smooth hover effect
          />
        ) : (
          <div className="text-gray-500 text-sm">No Image</div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
