import React from "react";
import ProductCard from "./components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getAllProductsWithSupplier, getAllSuppliers } from "./actions/Actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, AlertCircle } from "lucide-react"; // Import Lucide icons
import FilterBySupplier from "./components/FliterBySupplier";

interface PageProps {
  searchParams: Promise<{ supplierId?: string }>;
}

async function Page({ searchParams }: PageProps) {
  // Extract searchParams
  const params = await searchParams;

  // Fetch all suppliers
  const suppliers = await getAllSuppliers();

  // Extract supplierId from searchParams
  const supplierId = params.supplierId;

  // Fetch products based on supplierId
  const products = await getAllProductsWithSupplier(supplierId);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Supplier Filtering Section */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
            <FilterBySupplier suppliers={suppliers} />
          </div>
          <Badge
            variant="outline"
            className="px-4 py-2 text-base font-medium border-primary text-primary flex items-center gap-2"
          >
            <Package className="h-4 w-4" /> عدد المنتجات: {products.length}
          </Badge>
        </CardContent>
      </Card>

      {/* Products List or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle className="text-lg font-bold text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" /> لا توجد منتجات متاحة
          </AlertTitle>
          <AlertDescription className="text-sm text-destructive-foreground">
            لم يتم العثور على منتجات لهذا المورد. يرجى اختيار مورد آخر أو
            المحاولة لاحقًا.
          </AlertDescription>
          <Button
            variant="link"
            className="mt-4 p-0 text-sm text-primary hover:underline"
          >
            إعادة المحاولة
          </Button>
        </Alert>
      )}

      {/* Footer Separator */}
      <Separator className="mt-8 bg-border" />
    </div>
  );
}

export default Page;
