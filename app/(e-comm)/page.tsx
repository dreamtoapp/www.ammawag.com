// app/(e-comm)/page.tsx
import {
  fetchProducts,
  getPromotions,
  getSuppliersWithProducts,
} from "@/app/(e-comm)/homepage/actions/fetchProducts";
import dynamic from "next/dynamic";

// Lazy load components
const ProductList = dynamic(() => import("./homepage/component/ProductList"));
const OfferSection = dynamic(() => import("./homepage/component/Offer"));
const ProducCategory = dynamic(
  () => import("./homepage/component/ProducCategory")
);

// Define types for params and searchParams
type SearchParams = { [key: string]: string | string[] | undefined };

// Simulate a delay for testing
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate metadata dynamically
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const { sid } = resolvedSearchParams;

  return {
    title: `Supplier ${sid} - My E-Commerce Site`,
    description: `Details for supplier with ID ${sid}`,
  };
}

// Main page component
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const { sid } = resolvedSearchParams;

  // Simulate a 3-second delay for testing
  // await delay(9000);

  // Fetch data in parallel
  const [products, supplierWithItems, promotions] = await Promise.all([
    fetchProducts(sid?.toString()),
    getSuppliersWithProducts(),
    getPromotions(),
  ]);

  return (
    <div className="container mx-auto bg-background text-foreground">
      <OfferSection offers={promotions} />
      <ProducCategory suppliers={supplierWithItems} />
      <ProductList products={products} />
    </div>
  );
}
