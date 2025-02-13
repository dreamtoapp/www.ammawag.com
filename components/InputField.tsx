"use client";
import { Input } from "@/components/ui/input";
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;
  error?: string; // Optional error message for validation feedback
}

export default function InputField({
  name,
  label,
  placeholder,
  value,
  onChange,
  tooltip,
  error,
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {tooltip && (
          <span className="ml-1 text-xs text-gray-500" title={tooltip}>
            ⓘ
          </span>
        )}
      </label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
