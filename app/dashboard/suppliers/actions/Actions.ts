// app/dashboard/suppliers/actions/supplierActions.ts
"use server";

import db from "../../../../lib/prisma";
import { uploadImageToCloudinary } from "../../../../lib/cloudinary";

// Create or Update Supplier

export async function updateSupplier(id: string, data: any) {
  await db.supplier.update({
    where: { id },
    data,
  });
}

export async function getSupplierDetails(id: string) {
  // Fetch the supplier and check if it has related products
  const supplier = await db.supplier.findUnique({
    where: { id },
    include: {
      products: true, // Include related products
    },
  });

  if (!supplier) {
    throw new Error("Supplier not found.");
  }

  return {
    supplier,
    hasProducts: supplier.products.length > 0,
  };
}
// Delete Supplier

export async function deleteSupplier(
  id: string
): Promise<{ success: boolean; message: string }> {
  // Check if the supplier has any related products
  const productCount = await db.product.count({
    where: { supplierId: id },
  });

  if (productCount > 0) {
    // Return a message indicating that deletion is not possible
    return {
      success: false,
      message:
        "Cannot delete this supplier because it is linked to one or more products. Please delete the associated products first.",
    };
  }

  // If no related products, proceed with deletion
  await db.supplier.delete({
    where: { id },
  });

  // Return a success message
  return {
    success: true,
    message: "Supplier deleted successfully.",
  };
}

export async function getSuppliers() {
  try {
    const suppliers = await db.supplier.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        logo: true,
        publicId: true,
        _count: { select: { products: true } }, // Count of associated products
      },
    });

    return suppliers.map((supplier) => ({
      ...supplier,
      productCount: supplier._count.products, // Add product count to the supplier object
    }));
  } catch (error: any) {
    console.error("Error fetching suppliers:", error);
    throw new Error("Failed to fetch suppliers.");
  }
}

/**
 * Product Actions
 */

// Fetch All Products
export async function getProducts(supplierId?: string) {
  return await db.product.findMany({
    where: supplierId ? { supplierId } : undefined,
  });
}

// Fetch a Single Product by ID
export async function getProductById(id: string) {
  return await db.product.findUnique({ where: { id } });
}

// Create or Update a Product
export async function createOrUpdateProduct(id: string | null, data: any) {
  if (id) {
    await db.product.update({ where: { id }, data });
  } else {
    await db.product.create({ data });
  }
}

// Delete a Product
export async function deleteProduct(id: string) {
  // Check if the product is associated with any orders
  const orderCount = await db.order.count({
    where: {
      items: {
        some: {
          productId: id,
        },
      },
    },
  });

  if (orderCount > 0) {
    throw new Error(
      "Cannot delete this product because it is linked to one or more orders."
    );
  }

  await db.product.delete({ where: { id } });
}

/**
 * Creates or updates a supplier.
 * @param id - The ID of the supplier (null for new suppliers).
 * @param data - The supplier data (name, email, phone, address).
 * @param logoFile - The logo file to upload (optional).
 */
export async function createOrUpdateSupplier(
  id: string | null,
  data: any,
  logoFile?: File
) {
  let logoUrl = data.logo; // Existing logo URL (if any)
  let publicId = data.publicId; // Existing public ID (if any)

  // Upload the logo to Cloudinary if a file is provided
  if (logoFile) {
    try {
      const cloudinaryResponse = await uploadImageToCloudinary(logoFile);
      logoUrl = cloudinaryResponse.secure_url; // Save the secure URL
      publicId = cloudinaryResponse.public_id; // Save the public ID directly
    } catch (error: any) {
      console.error("Error uploading image to Cloudinary:", error.message);
      throw new Error("Failed to upload image to Cloudinary.");
    }
  }

  // Prepare the supplier data
  const supplierData = {
    ...data,
    logo: logoUrl, // Update the logo URL
    publicId: publicId, // Update the public ID
  };

  try {
    if (id) {
      // Update existing supplier
      await db.supplier.update({
        where: { id },
        data: supplierData,
      });
    } else {
      // Create new supplier
      await db.supplier.create({
        data: supplierData,
      });
    }
  } catch (error: any) {
    console.error("Error creating/updating supplier:", error);
    throw new Error("Failed to save supplier data.");
  }
}
