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
    <Card className="shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden border border-gray-300 flex flex-col h-full rtl">
      {/* Card Header */}
      <CardHeader className="p-4 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
        <CardTitle className="text-xl font-bold text-gray-900">
          {supplier.name}
        </CardTitle>
        <div className="flex space-x-2">
          {/* Edit and Delete Actions */}
          <EditSupplierDialog supplier={supplier} />
          <DeleteSupplierAlert supplierId={supplier.id} />
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-grow p-4 space-y-4">
        {/* Supplier Logo */}
        <CardImage
          imageUrl={supplier.logo || undefined} // Pass undefined if no logo is available
          altText={`شعار ${supplier.name}`}
          aspectRatio="square" // Use a square aspect ratio for the logo
          fallbackSrc="/default-logo.png" // Default fallback image
          placeholderText="لا يوجد شعار" // Custom placeholder text
        />

        {/* Supplier Details */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            <strong>البريد الإلكتروني:</strong> {supplier.email}
          </p>
          <p className="text-sm text-gray-700">
            <strong>رقم الهاتف:</strong> {supplier.phone}
          </p>
          <p className="text-sm text-gray-700">
            <strong>العنوان:</strong> {supplier.address}
          </p>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 bg-gray-100 border-t border-gray-300 flex justify-between items-center">
        {/* Product Count */}
        <div className="text-sm text-gray-700">
          {supplier.productCount > 0 ? (
            <span>{supplier.productCount} منتج</span>
          ) : (
            <span>لا توجد منتجات</span>
          )}
        </div>

        {/* Manage/Add Products Button */}
        {supplier.productCount > 0 ? (
          <Link
            href={`/dashboard/products?supplierId=${supplier.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            إدارة المنتجات
          </Link>
        ) : (
          <Link
            href={`/dashboard/products?supplierId=${supplier.id}`}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            إضافة منتج
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
