"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react"; // Import MapPin icon

const ContactInfo = ({
  email,
  phone,
  address,
  latitude,
  longitude,
}: {
  email?: string;
  phone?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}) => {
  const hasMapData = latitude && longitude;

  return (
    <div className="text-center sm:text-right">
      <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
      <p className="text-muted-foreground text-sm">{email}</p>
      <p className="text-muted-foreground text-sm">{phone}</p>
      <p className="text-muted-foreground text-sm">{address}</p>

      {/* Professional Button to Open Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-4 hover:bg-primary/40 transition-colors duration-300 flex items-center gap-2"
          >
            <MapPin size={18} /> {/* Map icon */}
            <span>عرض الخريطة</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>الموقع على الخريطة</DialogTitle>
          </DialogHeader>
          {hasMapData ? (
            <iframe
              width="100%"
              height="300"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
              allowFullScreen
              aria-label="خريطة الموقع"
            />
          ) : (
            <p className="text-muted-foreground text-center py-6">
              لا تتوفر بيانات الخريطة.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactInfo;
