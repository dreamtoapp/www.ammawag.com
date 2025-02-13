import React from "react";
import ProductCard from "./components/ProductCard";
import {
  getAllProductsWithSupplier,
  getAllSuppliers,
} from "../orders/actions/Actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import FilterBySupplier from "./components/FliterBySupplier";

interface PageProps {
  searchParams: Promise<{ supplierId?: string }>;
}

async function Page({ searchParams }: PageProps) {
  // انتظار استخراج searchParams
  const params = await searchParams;

  // جلب جميع الموردين
  const suppliers = await getAllSuppliers();

  // استخراج supplierId من searchParams
  const supplierId = params.supplierId;

  // جلب المنتجات بناءً على supplierId
  const products = await getAllProductsWithSupplier(supplierId);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* قسم فلترة الموردين */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <FilterBySupplier suppliers={suppliers} />
          <Badge variant="outline" className="px-4 py-2 text-lg">
            عدد المنتجات: {products.length}
          </Badge>
        </CardContent>
      </Card>

      {/* قائمة المنتجات */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>لا توجد منتجات متاحة</AlertTitle>
          <AlertDescription>
            لم يتم العثور على منتجات لهذا المورد. يرجى اختيار مورد آخر.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default Page;
