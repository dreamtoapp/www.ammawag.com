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
import { Package, Eye, ShoppingCart } from "lucide-react"; // Import Lucide icons for visual enhancement

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
    details?: string | null; // Optional field
    imageUrl?: string | null; // Optional field
    supplier?: SupplierInfo | null; // Optional supplier info
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border border-border bg-background flex flex-col h-full hover:-translate-y-1">
      {/* Card Header */}
      <CardHeader className="p-4 bg-muted/50 border-b border-border flex flex-col gap-2">
        <CardTitle className="text-lg font-semibold text-primary line-clamp-1">
          {product.name}
        </CardTitle>
        {product.supplier && (
          <CardDescription className="text-sm text-muted-foreground flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="truncate">{product.supplier.name}</span>
          </CardDescription>
        )}
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 space-y-4 flex-grow">
        {/* Image */}
        <div className="w-full h-48 relative rounded-lg overflow-hidden bg-muted/20">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={`${product.name} image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-300 hover:scale-105"
              // onError={(e) => {
              //   e.currentTarget.src = "/fallback/pdflogo.jpg"; // Correct fallback image path
              // }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <strong className="font-medium">Price:</strong> $
            {product.price.toFixed(2)}
          </p>
          {product.size && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <strong className="font-medium">Size:</strong> {product.size}
            </p>
          )}
          {product.details && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <strong className="font-medium">Details:</strong>{" "}
              <span className="line-clamp-2">{product.details}</span>
            </p>
          )}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 bg-muted/50 border-t border-border flex justify-between gap-2 mt-auto">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 flex-1"
        >
          <Eye className="h-4 w-4" />
          <span className="truncate">View Details</span>
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-2 flex-1"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="truncate">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
