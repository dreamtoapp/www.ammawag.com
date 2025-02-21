// app/page.tsx
import { fetchProducts } from "@/app/(e-comm)/homepage/actions/fetchProducts";
import ProductList from "./homepage/component/ProductList";
import OfferSection from "./homepage/component/Offer";
import ProducCategory from "./homepage/component/ProducCategory";
import Fotter from "./homepage/component/Fotter";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto">
      {/* <OfferSection /> */}
      <ProducCategory />
      <ProductList products={products} />
      <Fotter />
    </div>
  );
}
