"use client"; // Mark as a Client Component
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SupplierInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    size?: string | null; // Optional field
    imageUrl?: string | null; // Optional field
    supplier?: SupplierInfo | null; // Optional supplier info
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-gray-200">
      {/* Card Header */}
      <CardHeader className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {product.name}
        </CardTitle>
        {product.supplier && (
          <CardDescription className="text-sm text-gray-600">
            Supplied by: {product.supplier.name}
          </CardDescription>
        )}
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 space-y-4">
        {/* Image */}
        <div className="w-full h-48 relative rounded-lg overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={`${product.name} image`}
              fill
              className="object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "/default-product.jpg"; // Fallback image
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
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
          {product.size && (
            <p className="text-sm text-gray-600">
              <strong>Size:</strong> {product.size}
            </p>
          )}
          {product.supplier && (
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <strong>Supplier:</strong> {product.supplier.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {product.supplier.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {product.supplier.phone}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <Button variant="secondary" size="sm">
          View Transactions
        </Button>
      </CardFooter>
    </Card>
  );
}
