// app/(e-comm)/actions/fetchProducts.ts
"use server";

import db from "@/lib/prisma";

// export async function fetchProducts() {
//   try {
//     const products = await db.product.findMany({
//       where: { published: true },
//       include: { supplier: true },
//     });

//     // Transform the data to ensure imageUrl is always a string
//     return products.map((product) => ({
//       ...product,
//       imageUrl: product.imageUrl || "https://via.placeholder.com/150", // Default image if null
//     }));
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw new Error("Failed to fetch products");
//   }
// }

export async function fetchProducts(sid?: string) {
  try {
    const products = await db.product.findMany({
      where: {
        published: true,
        supplierId: sid ? sid : undefined, // Filter by supplierId if sid is provided
      },
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

// export async function getSuppliersWithProducts() {
//   try {
//     const suppliersWithProducts = await db.supplier.findMany({
//       where: {
//         products: {
//           some: {}, // Ensures the supplier has at least one product
//         },
//       },
//       include: {
//         _count: {
//           select: {
//             products: true, // Include the count of products
//           },
//         },
//       },
//     });

//     return suppliersWithProducts;
//   } catch (error) {
//     console.error("Error fetching suppliers with products:", error);
//     throw new Error("Failed to fetch suppliers with products");
//   }
// }
export async function getSuppliersWithProducts(sid?: string) {
  try {
    const suppliersWithProducts = await db.supplier.findMany({
      where: {
        id: sid ? sid : undefined, // Filter by supplierId if sid is provided
        products: {
          some: {
            published: true, // Ensure the supplier has at least one published product
          },
        },
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                published: true, // Count only published products
              },
            },
          },
        },
      },
    });

    return suppliersWithProducts;
  } catch (error) {
    console.error("Error fetching suppliers with products:", error);
    throw new Error("Failed to fetch suppliers with products");
  }
}
