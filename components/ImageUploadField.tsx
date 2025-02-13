"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface ImageUploadFieldProps {
  label: string;
  previewUrl: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Optional error message for validation feedback
}

export default function ImageUploadField({
  label,
  previewUrl,
  onChange,
  error,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input type="file" accept="image/*" onChange={onChange} />
      {previewUrl && (
        <div className="flex justify-center items-center h-full">
          <Image
            src={previewUrl}
            alt="Preview"
            width={150}
            height={150}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
