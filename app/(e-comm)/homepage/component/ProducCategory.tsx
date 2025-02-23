"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "../../../../components/ui/badge";

// تعريف نوع المورد
interface Supplier {
  id: string;
  name: string;
  logo?: string | null;
  publicId?: string | null;
  email?: string;
  phone?: string;
  address?: string;
  _count?: {
    products: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// تعريف نوع الـ props
interface ProductCategoryProps {
  suppliers: Supplier[];
}

const ProductCategory = ({ suppliers }: ProductCategoryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Track if a filter is applied
  const [loadingSupplierId, setLoadingSupplierId] = useState<string | null>(
    null
  ); // Track loading state per supplier

  // Effect to sync selectedSupplier with the query parameter
  useEffect(() => {
    const supplierName = searchParams.get("name");
    const supplierId = searchParams.get("sid");

    if (supplierName && supplierId) {
      const decodedSupplierName = decodeURIComponent(
        supplierName.replace(/-/g, " ")
      ); // Replace hyphens with spaces
      const supplier = suppliers.find(
        (s) => s.id === supplierId && s.name === decodedSupplierName
      );
      if (supplier) {
        setSelectedSupplier(supplier);
        setIsFilterApplied(true); // Filter is applied via URL
      }
    } else {
      setSelectedSupplier(null); // Reset selectedSupplier if no query parameter
      setIsFilterApplied(false); // No filter applied
    }
  }, [searchParams, suppliers]);

  // Handle supplier selection and URL update
  const handleSelectSupplier = async (supplier: Supplier) => {
    setLoadingSupplierId(supplier.id); // Start loading for this supplier

    // Clean the supplier name for the URL (replace spaces with hyphens)
    const cleanSupplierName = supplier.name.replace(/\s+/g, "-");
    const encodedSupplierName = encodeURIComponent(cleanSupplierName); // Encode the supplier name
    const newUrl = `?name=${encodedSupplierName}&sid=${supplier.id}`; // Construct the new URL

    // Simulate a delay (e.g., for data fetching or page transition)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay

    router.push(newUrl); // Update the URL
    setSelectedSupplier(supplier);
    setIsFilterApplied(true); // Filter is applied
    setLoadingSupplierId(null); // Stop loading
  };

  // Handle removing the filter
  const handleRemoveFilter = async () => {
    setLoadingSupplierId("remove"); // Start loading for filter removal
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    setSelectedSupplier(null); // Reset selectedSupplier
    setIsFilterApplied(false); // No filter applied
    router.push("/"); // Navigate back to the base URL (remove query parameter)
    setLoadingSupplierId(null); // Stop loading
  };

  return (
    <div className="bg-gray-50 p-6 rtl text-right w-full max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">الموردون</h2>
        {isFilterApplied && ( // Show "إزالة التصفية" only if a filter is applied
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all shadow-md"
            onClick={handleRemoveFilter}
            disabled={loadingSupplierId === "remove"} // Disable button while loading
          >
            {loadingSupplierId === "remove" ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            ) : (
              "إزالة التصفية"
            )}
          </Button>
        )}
      </div>
      <ScrollArea className="w-full rounded-lg border bg-white shadow-sm overflow-x-auto">
        <div className="flex space-x-4 p-4">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className={`relative cursor-pointer rounded-lg p-4 transition-all flex-shrink-0 w-32 h-32 flex flex-col justify-center items-center bg-white hover:bg-gray-50 border ${
                selectedSupplier?.id === supplier.id
                  ? "border-2 border-blue-500 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() =>
                !loadingSupplierId && handleSelectSupplier(supplier)
              } // Disable clicks while loading
            >
              {/* Overlay and spinner for the selected supplier */}
              {loadingSupplierId === supplier.id && (
                <>
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg z-10"></div>{" "}
                  {/* Semi-transparent overlay */}
                  <div className="absolute inset-0 flex justify-center items-center z-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent"></div>{" "}
                    {/* Attractive spinner */}
                  </div>
                </>
              )}

              <Avatar className="w-16 h-16 mb-2 z-0">
                <AvatarImage
                  src={supplier.logo || ""}
                  alt={supplier.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  {supplier.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* Supplier name with truncation and tooltip */}
              <div
                className="w-full text-sm font-medium text-gray-700 text-center truncate z-0"
                title={supplier.name} // Tooltip shows full name on hover
              >
                {supplier.name}
              </div>
              {/* Badge for product count */}
              {supplier._count?.products !== undefined && (
                <Badge
                  className={`absolute -top-2 -right-2 text-white shadow-sm transition-colors z-0 ${
                    selectedSupplier?.id === supplier.id
                      ? "bg-blue-500 hover:bg-blue-600" // Match border color
                      : "bg-green-500 hover:bg-green-600" // Default color
                  }`}
                >
                  {supplier._count.products} منتجات
                </Badge>
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProductCategory;
