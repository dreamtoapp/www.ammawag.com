// app/dashboard/settings/GeneralTab.tsx
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface GeneralTabProps {
  initialData: {
    id: string;
    fullName?: string | null;
    bio?: string | null;
  };
}

export default function GeneralTab({ initialData }: GeneralTabProps) {
  return (
    <section className="space-y-4  p-2 w-full">
      <h2 className="text-xl font-semibold text-white p-1 bg-slate-400 font-cairo">
        المعلومات العامة
      </h2>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <Label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 font-cairo"
          >
            الاسم الكامل
          </Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={initialData.fullName || ""}
            placeholder="أدخل اسمك الكامل"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Bio */}
        <div>
          <Label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 font-cairo"
          >
            الوصف
          </Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={initialData.bio || ""}
            placeholder="اكتب وصفًا قصيرًا عن الشركة"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>
  );
}
