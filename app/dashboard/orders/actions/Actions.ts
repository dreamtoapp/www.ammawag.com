import db from "../../../../lib/prisma";

export const getAllProductsWithSupplier = async (supplierId?: string) => {
  try {
    const products = await db.product.findMany({
      where: supplierId ? { supplierId } : undefined, // Filter by supplierId if provided
      include: {
        supplier: true, // Include supplier information
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products with supplier info:", error);
    throw new Error("Failed to fetch products.");
  }
};

export async function getAllSuppliers() {
  return await db.supplier.findMany({ select: { id: true, name: true } });
}

// "use server";

// import db from "../../../../lib/prisma";

// export async function getAllProductsWithSupplier(
//   supplierId: string | null = null
// ) {
//   const whereClause = supplierId ? { supplierId } : {};
//   return await db.product.findMany({
//     include: { supplier: true },
//   });
// }
