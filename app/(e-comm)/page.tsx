import {
  fetchProducts,
  getPromotions,
  getSuppliersWithProducts,
} from "@/app/(e-comm)/homepage/actions/fetchProducts";
import dynamic from "next/dynamic";
import CheckIsLogin from "./homepage/component/CheckIsLogin";
import { generatePageMetadata } from "../../lib/seo-utils";

// Lazy load components
const ProductList = dynamic(() => import("./homepage/component/ProductList"));
const OfferSection = dynamic(() => import("./homepage/component/Offer"));
const ProducCategory = dynamic(
  () => import("./homepage/component/ProducCategory")
);
const WhatsAppButton = dynamic(
  () => import("./homepage/component/WhatsAppButton")
);

// Define types for params and searchParams
type SearchParams = { [key: string]: string | string[] | undefined };

// Generate metadata dynamically
export async function generateMetadata() {
  return generatePageMetadata("ecomm");
}

// Main page component
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const { sid } = resolvedSearchParams;

  // Fetch data in parallel
  const [products, supplierWithItems, promotions] = await Promise.all([
    fetchProducts(sid?.toString()),
    getSuppliersWithProducts(),
    getPromotions(),
  ]);
  console.log(promotions);

  return (
    <div className="container mx-auto bg-background text-foreground flex flex-col gap-4">
      <OfferSection offers={promotions} />
      <ProducCategory suppliers={supplierWithItems} />
      <ProductList products={products} />
      <WhatsAppButton /> {/* Add the WhatsApp button */}
    </div>
  );
}
