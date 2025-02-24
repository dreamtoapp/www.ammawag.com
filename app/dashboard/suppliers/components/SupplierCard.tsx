import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import DeleteSupplierAlert from "./DeleteSupplierAlert";
import EditSupplierDialog from "./EditSupplierDialog";
import CardImage from "../../../../components/CardImage"; // Import the enhanced CardImage component
import { Badge } from "@/components/ui/badge"; // Import a badge component for the product count
import { Edit, Trash } from "lucide-react"; // Modern icons for Edit and Delete actions

interface SupplierCardProps {
  supplier: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo: string | null; // Logo URL (optional)
    publicId: string | null; // Public ID (optional)
    productCount: number; // Number of products associated with the supplier
  };
}

export default function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card className="rounded-lg border border-border bg-background shadow-sm h-full rtl">
      {/* Card Header */}
      <CardHeader className="flex justify-between items-start p-4 border-b border-border">
        <div className=" w-full">
          {/* Supplier Name and Product Count Badge */}
          <div className="flex items-center justify-between w-full flex-wrap">
            <CardTitle className="text-xl font-bold text-foreground">
              {supplier.name}
            </CardTitle>
            <Badge
              variant={supplier.productCount > 0 ? "outline" : "secondary"}
              className="text-sm rounded-full  bg-green-400/50  "
            >
              {supplier.productCount > 0
                ? `${supplier.productCount} منتج`
                : "لا توجد منتجات"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 flex-grow space-y-4">
        {/* Supplier Logo */}
        <div className="flex justify-center">
          <CardImage
            imageUrl={supplier.logo || undefined} // Pass undefined if no logo is available
            altText={`شعار ${supplier.name}`}
            aspectRatio="square" // Use a square aspect ratio for the logo
            fallbackSrc="/default-logo.png" // Default fallback image
            placeholderText="لا يوجد شعار" // Custom placeholder text
          />
        </div>

        {/* Supplier Details */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong>البريد الإلكتروني:</strong>{" "}
            <span className="text-foreground">{supplier.email}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>رقم الهاتف:</strong>{" "}
            <span className="text-foreground">{supplier.phone}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>العنوان:</strong>{" "}
            <span className="text-foreground">{supplier.address}</span>
          </p>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 flex justify-between items-center border-t border-border">
        {/* Edit and Delete Actions */}
        <div className="flex  items-center gap-2">
          <EditSupplierDialog supplier={supplier} />

          <DeleteSupplierAlert supplierId={supplier.id} />
        </div>

        {/* Manage/Add Products Button */}
        <Link
          href={`/dashboard/products?supplierId=${supplier.id}`}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            supplier.productCount > 0
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {supplier.productCount > 0 ? "إدارة المنتجات" : "إضافة منتج"}
        </Link>
      </CardFooter>
    </Card>
  );
}
