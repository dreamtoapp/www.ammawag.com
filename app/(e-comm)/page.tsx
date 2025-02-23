// app/page.tsx
import {
  fetchProducts,
  getSuppliersWithProducts,
} from "@/app/(e-comm)/homepage/actions/fetchProducts";
import ProductList from "./homepage/component/ProductList";
import OfferSection from "./homepage/component/Offer";
import ProducCategory from "./homepage/component/ProducCategory";
import { Suspense } from "react";

// Define types for params and searchParams
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Generate metadata dynamically (optional)
export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug; // Access dynamic route parameters
  const sid = searchParams.sid; // Access query parameters

  return {
    title: `Supplier ${sid} - My E-Commerce Site`,
    description: `Details for supplier with ID ${sid}`,
  };
}

// Main page component
export default async function HomePage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  // Await params and searchParams
  const params = await props.params;
  const searchParams = await props.searchParams;

  // Access query parameters
  const sid = searchParams.sid;
  console.log("Supplier ID (sid) from query:", sid);

  // Fetch data
  const products = await fetchProducts(sid?.toString());
  const supplierWithITems = await getSuppliersWithProducts();

  return (
    <div className="container mx-auto">
      {/* <OfferSection /> */}
      <ProducCategory suppliers={supplierWithITems} />
      <ProductList products={products} />
    </div>
  );
}
