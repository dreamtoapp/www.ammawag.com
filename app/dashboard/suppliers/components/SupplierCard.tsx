// app/dashboard/suppliers/components/SupplierCard.tsx
"use client"; // Mark as a Client Component

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import DeleteSupplierAlert from "./DeleteSupplierAlert";
import EditSupplierDialog from "./EditSupplierDialog";

interface SupplierCardProps {
  supplier: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo: string | null;
    publicId: string | null;
    productCount: number; // Number of products associated with the supplier
  };
}

export default function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-gray-200 flex flex-col h-full">
      {/* Card Header */}
      <CardHeader className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {supplier.name}
        </CardTitle>
        <div className="flex space-x-2">
          {/* Edit Supplier Dialog */}
          <EditSupplierDialog supplier={supplier} />
          {/* Delete Supplier Alert */}
          <DeleteSupplierAlert supplierId={supplier.id} />
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-grow p-4 space-y-4">
        {/* Logo */}
        <div className="w-full h-48 sm:h-64 relative">
          {supplier.logo ? (
            <Image
              src={supplier.logo}
              alt={`${supplier.name} logo`}
              fill
              className="object-cover object-center rounded-lg shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "/default-logo.png"; // Fallback image
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Logo</span>
            </div>
          )}
        </div>

        {/* Supplier Details */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {supplier.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Phone:</strong> {supplier.phone}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {supplier.address}
          </p>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        {/* Product Count */}
        <div className="text-sm text-gray-600">
          {supplier.productCount > 0 ? (
            <span>{supplier.productCount} item(s)</span>
          ) : (
            <span>No items</span>
          )}
        </div>

        {/* Manage/Add Item Button */}
        {supplier.productCount > 0 ? (
          <Link href={`/dashboard/products?supplierId=${supplier.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
              Manage Items
            </button>
          </Link>
        ) : (
          <Link href={`/dashboard/products/add?supplierId=${supplier.id}`}>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm font-medium">
              Add Item
            </button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
