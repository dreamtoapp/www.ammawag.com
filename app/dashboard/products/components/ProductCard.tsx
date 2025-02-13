"use client"; // Mark as a Client Component
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CardImage from "../../../../components/CardImage"; // Import the enhanced CardImage component
import EditProductDialog from "./EditProductDialog";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    size?: string | null; // Optional field
    imageUrl?: string | null; // Optional field
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
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 space-y-4">
        {/* Image */}
        <CardImage
          // src={product.imageUrl}

          imageUrl={product.imageUrl || undefined} // Pass undefined if no image is available
          altText={`${product.name} image`}
          aspectRatio="square" // Use a square aspect ratio for product images
          fallbackSrc="/default-product.jpg" // Default fallback image
          placeholderText="No Image Available" // Custom placeholder text
        />

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
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        {/* Edit Button */}
        <EditProductDialog product={product} />

        {/* Delete Button */}
        <Button variant="destructive" size="sm">
          Delete
        </Button>
        {/* View Transactions Button */}
        <Button variant="secondary" size="sm">
          View Transactions
        </Button>
      </CardFooter>
    </Card>
  );
}
