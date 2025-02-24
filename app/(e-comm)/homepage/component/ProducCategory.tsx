"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { FiX } from "react-icons/fi"; // Clear filter icon
import { ImSpinner8 } from "react-icons/im"; // Spinner icon

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
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [loadingSupplierId, setLoadingSupplierId] = useState<string | null>(
    null
  );

  // Effect to sync selectedSupplier with the query parameter
  useEffect(() => {
    const supplierName = searchParams.get("name");
    const supplierId = searchParams.get("sid");

    if (supplierName && supplierId) {
      const decodedSupplierName = decodeURIComponent(
        supplierName.replace(/-/g, " ")
      );
      const supplier = suppliers.find(
        (s) => s.id === supplierId && s.name === decodedSupplierName
      );
      if (supplier) {
        setSelectedSupplier(supplier);
        setIsFilterApplied(true);
      }
    } else {
      setSelectedSupplier(null);
      setIsFilterApplied(false);
    }
  }, [searchParams, suppliers]);

  // Handle supplier selection and URL update
  const handleSelectSupplier = async (supplier: Supplier) => {
    setLoadingSupplierId(supplier.id);

    const cleanSupplierName = supplier.name.replace(/\s+/g, "-");
    const encodedSupplierName = encodeURIComponent(cleanSupplierName);
    const newUrl = `?name=${encodedSupplierName}&sid=${supplier.id}`;

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    router.push(newUrl);
    setSelectedSupplier(supplier);
    setIsFilterApplied(true);
    setLoadingSupplierId(null);
  };

  // Handle removing the filter
  const handleRemoveFilter = async () => {
    setLoadingSupplierId("remove");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    setSelectedSupplier(null);
    setIsFilterApplied(false);
    router.push("/");
    setLoadingSupplierId(null);
  };

  return (
    <Card className="w-full max-w-screen-lg mx-auto rtl text-right shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <CardHeader className="border-b p-6 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-foreground dark:text-gray-100">
            الفئات
          </CardTitle>
          {isFilterApplied && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleRemoveFilter}
                  disabled={loadingSupplierId === "remove"}
                  className="dark:bg-red-600 dark:hover:bg-red-700"
                >
                  {loadingSupplierId === "remove" ? (
                    <ImSpinner8 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FiX className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="dark:bg-gray-800 dark:text-gray-100"
              >
                <p>إزالة التصفية</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="w-full rounded-lg border shadow-sm dark:border-gray-800">
          <div className="flex space-x-4 p-4">
            {suppliers.map((supplier) => (
              <Tooltip key={supplier.id}>
                <TooltipTrigger asChild>
                  <div
                    className={`relative cursor-pointer rounded-lg p-4 transition-all flex-shrink-0 w-32 h-32 flex flex-col justify-center items-center hover:bg-accent/50 border ${
                      selectedSupplier?.id === supplier.id
                        ? "border-2 border-primary shadow-lg dark:border-blue-600"
                        : "border-muted hover:border-primary dark:border-gray-700 dark:hover:border-blue-600"
                    }`}
                    onClick={() =>
                      !loadingSupplierId && handleSelectSupplier(supplier)
                    }
                  >
                    {loadingSupplierId === supplier.id && (
                      <>
                        <div className="absolute inset-0 bg-black/30 rounded-lg z-10"></div>
                        <div className="absolute inset-0 flex justify-center items-center z-20">
                          <ImSpinner8 className="h-8 w-8 animate-spin text-primary dark:text-blue-600" />
                        </div>
                      </>
                    )}

                    <Avatar className="w-16 h-16 mb-2 z-0">
                      <AvatarImage
                        src={supplier.logo || ""}
                        alt={supplier.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold dark:bg-blue-900/20 dark:text-blue-400">
                        {supplier.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-full text-sm font-medium text-foreground text-center truncate dark:text-gray-100">
                      {supplier.name}
                    </div>
                    {supplier._count?.products !== undefined && (
                      <Badge
                        variant={
                          selectedSupplier?.id === supplier.id
                            ? "default"
                            : "secondary"
                        }
                        className="absolute -top-2 -right-2 shadow-sm dark:bg-gray-800 dark:text-gray-100"
                      >
                        {supplier._count.products} منتجات
                      </Badge>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="dark:bg-gray-800 dark:text-gray-100"
                >
                  <p>{supplier.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="dark:bg-gray-700" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProductCategory;
