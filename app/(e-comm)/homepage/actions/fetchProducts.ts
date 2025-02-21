// app/(e-comm)/actions/fetchProducts.ts
"use server";

import db from "@/lib/prisma";

export async function fetchProducts() {
  try {
    const products = await db.product.findMany({
      where: { published: true },
      include: { supplier: true },
    });

    // Transform the data to ensure imageUrl is always a string
    return products.map((product) => ({
      ...product,
      imageUrl: product.imageUrl || "https://via.placeholder.com/150", // Default image if null
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
