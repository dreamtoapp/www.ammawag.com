// app/dashboard/drivers/components/DriverCard.tsx
"use client"; // Mark as a Client Component

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import EditDriverDialog from "./EditDriverDialog";
import DeleteDriverAlert from "./DeleteDriverAlert";

interface DriverCardProps {
  driver: {
    id: string;
    name: string;
    email: string;
    phone: string;
    imageUrl?: string | null;
  };
}

export default function DriverCard({ driver }: DriverCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-gray-200">
      {/* Card Header */}
      <CardHeader className="p-4 bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {driver.name}
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 space-y-4">
        {/* Image */}
        <div className="w-full h-48 relative rounded-lg overflow-hidden">
          {driver.imageUrl ? (
            <Image
              src={driver.imageUrl}
              alt={`${driver.name}'s profile`}
              fill
              className="object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "/default-driver.jpg"; // Fallback image
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {driver.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Phone:</strong> {driver.phone}
          </p>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        {/* Edit Driver Dialog */}
        <EditDriverDialog driver={driver}>
          <button className="text-blue-500 hover:underline">Edit</button>
        </EditDriverDialog>

        {/* Delete Driver Alert */}
        <DeleteDriverAlert driverId={driver.id}>
          <button className="text-red-500 hover:underline">Delete</button>
        </DeleteDriverAlert>
      </CardFooter>
    </Card>
  );
}
