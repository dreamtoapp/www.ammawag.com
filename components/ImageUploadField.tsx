"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface ImageUploadFieldProps {
  label: string;
  previewUrl: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Optional error message for validation feedback
  width?: number; // Optional width for the preview image (default: 150)
  height?: number; // Optional height for the preview image (default: 150)
}

export default function ImageUploadField({
  label,
  previewUrl,
  onChange,
  error,
  width = 80, // Default width
  height = 80, // Default height
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-4">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* File Input */}
      <Input type="file" accept="image/*" onChange={onChange} />

      {/* Image Preview */}
      {previewUrl && (
        <div className="flex justify-center items-center">
          <Image
            src={previewUrl}
            alt="Preview"
            width={width} // Use provided width or default
            height={height} // Use provided height or default
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
