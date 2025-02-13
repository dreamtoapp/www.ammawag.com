import React from "react";
import { getAllProduct } from "./actions/Actions";

async function page() {
  const products = await getAllProduct();
  console.log(products);
  return <div>orders</div>;
}

export default page;
