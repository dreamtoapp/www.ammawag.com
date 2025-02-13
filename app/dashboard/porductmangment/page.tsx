import React from "react";
import ProductCard from "./components/ProductCard";
import {
  getAllProductsWithSupplier,
  getAllSuppliers,
} from "../orders/actions/Actions";
import FilterBySupplier from "./components/FliterBySupplier";

interface PageProps {
  searchParams: { supplierId?: string }; // Define the type for searchParams
}

async function Page({ searchParams }: PageProps) {
  // Fetch all suppliers
  const suppliers = await getAllSuppliers();

  // Extract supplierId from searchParams
  const supplierId = searchParams.supplierId || undefined;

  // Fetch products based on the supplierId
  const products = await getAllProductsWithSupplier(supplierId);

  return (
    <div className="p-6 space-y-6">
      {/* Supplier Filter */}
      <div className="flex items-center justify-between">
        <FilterBySupplier suppliers={suppliers} />
        <p>Items: {products.length}</p>
      </div>

      {/* Product List */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found for this supplier.</p>
      )}
    </div>
  );
}

export default Page;
