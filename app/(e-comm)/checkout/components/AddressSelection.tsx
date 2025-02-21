"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddressSelection({
  showAddressDialog,
  setShowAddressDialog,
  savedAddress,
  coordinates,
  handleSelectAddress,
}: {
  showAddressDialog: boolean;
  setShowAddressDialog: (value: boolean) => void;
  savedAddress: string | null;
  coordinates: { lat: number | null; lng: number | null };
  handleSelectAddress: (address: string) => void;
}) {
  const [manualAddress, setManualAddress] = useState("");

  return (
    <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اختيار عنوان التوصيل</DialogTitle>
        </DialogHeader>
        {savedAddress && (
          <Button
            variant="outline"
            onClick={() => handleSelectAddress(savedAddress)}
            className="w-full mb-2"
          >
            استخدم العنوان المسجل: {savedAddress}
          </Button>
        )}
        {coordinates.lat && coordinates.lng && (
          <Button
            variant="outline"
            onClick={() =>
              handleSelectAddress(
                `خط العرض: ${coordinates.lat}, خط الطول: ${coordinates.lng}`
              )
            }
            className="w-full mb-2"
          >
            استخدم موقعي الحالي
          </Button>
        )}
        <Input
          type="text"
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          placeholder="أدخل عنوانًا يدويًا"
          className="mt-2 w-full"
        />
        <Button
          onClick={() => handleSelectAddress(manualAddress)}
          className="w-full mt-2"
        >
          استخدام هذا العنوان
        </Button>
      </DialogContent>
    </Dialog>
  );
}
