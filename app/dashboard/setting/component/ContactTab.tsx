// app/dashboard/settings/ContactTab.tsx
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactTabProps {
  initialData: {
    email?: string | null;
    phoneNumber?: string | null;
  };
}

export default function ContactTab({ initialData }: ContactTabProps) {
  return (
    <section className="space-y-4 w-full">
      <h2 className="text-xl font-semibold text-white p-1 bg-slate-400 font-cairo">
        معلومات التواصل
      </h2>
      <div className="space-y-4">
        {/* Email Address */}

        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 font-cairo"
          >
            البريد الإلكتروني
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={initialData.email || ""}
            placeholder="example@example.com"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 font-cairo"
          >
            رقم الهاتف
          </Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={initialData.phoneNumber || ""}
            placeholder="+1234567890"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>
  );
}
