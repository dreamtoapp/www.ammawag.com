// app/dashboard/settings/TaxTab.tsx
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TaxTabProps {
  initialData: {
    taxNumber?: string | null;
    taxQrImage?: string | null;
  };
}

export default function TaxTab({ initialData }: TaxTabProps) {
  return (
    <section className="space-y-4 w-full">
      <h2 className="text-xl font-semibold text-white p-1 bg-slate-400 font-cairo">
        معلومات الضرائب
      </h2>
      <div className="space-y-4">
        {/* Tax Number */}
        <div>
          <Label
            htmlFor="taxNumber"
            className="block text-sm font-medium text-gray-700 font-cairo"
          >
            الرقم الضريبي
          </Label>
          <Input
            id="taxNumber"
            name="taxNumber"
            defaultValue={initialData.taxNumber || ""}
            placeholder="أدخل الرقم الضريبي"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Tax QR Image */}
        <div>
          <Label
            htmlFor="taxQrImage"
            className="block text-sm font-medium text-gray-700 font-cairo"
          >
            صورة QR الضريبية
          </Label>
          <Input
            id="taxQrImage"
            name="taxQrImage"
            defaultValue={initialData.taxQrImage || ""}
            placeholder="https://example.com/tax-qr.png"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>
  );
}
