"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MapDisplayProps {
  coordinates: { lat: number; lng: number };
}

const MapDisplay = ({ coordinates }: MapDisplayProps) => {
  if (!coordinates.lat || !coordinates.lng) {
    return (
      <p className="text-red-500 text-sm text-center mt-2">
        لم يتم تحديد الموقع بعد.
      </p>
    );
  }

  // Construct the Google Maps URL without an API key
  const mapUrl = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=18&output=embed`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-3">
          عرض الخريطة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle> الموقع علي الخريطة</DialogTitle>
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
          className="rounded-lg border"
          allowFullScreen
          title="موقعك الحالي"
        />
      </DialogContent>
    </Dialog>
  );
};

export default MapDisplay;
