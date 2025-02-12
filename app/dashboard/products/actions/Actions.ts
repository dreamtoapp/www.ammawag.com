// app/dashboard/products/actions/Actions.ts
"use server";
import { uploadImageToCloudinary } from "../../../../lib/cloudinary";
import db from "../../../../lib/prisma";

/**
 * Fetches all products for a specific supplier.
 * @param supplierId - The ID of the supplier.
 */
// app/dashboard/products/actions/Actions.ts

/**
 * Fetches all products and supplier details for a specific supplier.
 * @param supplierId - The ID of the supplier.
 */
export async function getProductsBySupplier(supplierId: string) {
  try {
    const supplier = await db.supplier.findUnique({
      where: { id: supplierId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        logo: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            size: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!supplier) {
      throw new Error("Supplier not found.");
    }

    return supplier;
  } catch (error: any) {
    console.error("Error fetching supplier and products:", error);
    throw new Error("Failed to fetch supplier and products.");
  }
}
/**
 * Fetches a single product by its ID.
 * @param productId - The ID of the product.
 */
export async function getProductById(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true,
        supplierId: true,
      },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product.");
  }
}

/**
 * Creates a new product.
 * @param data - The product data (name, price, supplierId).
 */
// app/dashboard/products/actions/Actions.ts

/**
 * Creates a new product.
 * @param data - The product data (name, price, size, imageUrl, supplierId).
 */
export async function createProduct(data: {
  name: string;
  price: number;
  size: string; // Required field
  imageUrl: string; // Required field
  supplierId: string; // ID of the supplier
}) {
  try {
    const product = await db.product.create({
      data: {
        name: data.name,
        price: data.price,
        size: data.size, // Include the size field
        imageUrl: data.imageUrl,
        supplierId: data.supplierId,
      },
    });
    return product;
  } catch (error: any) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product.");
  }
}

/**
 * Updates an existing product.
 * @param productId - The ID of the product.
 * @param data - The updated product data (name, price).
 */
export async function updateProduct(
  productId: string,
  data: { name: string; price: number }
) {
  try {
    const product = await db.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        price: data.price,
      },
    });
    return product;
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product.");
  }
}

/**
 * Deletes a product by its ID.
 * @param productId - The ID of the product.
 */
export async function deleteProduct(productId: string) {
  try {
    await db.product.delete({
      where: { id: productId },
    });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
}

// app/dashboard/products/actions/Actions.ts

// app/dashboard/products/actions/Actions.ts

export async function createOrUpdateProduct(
  id: string | null,
  data: any,
  imageFile?: File
) {
  let imageUrl = data.imageUrl; // Existing image URL (if any)
  let publicId = data.publicId; // Existing public ID (if any)

  // Upload the image to Cloudinary if a file is provided
  if (imageFile) {
    try {
      const cloudinaryResponse = await uploadImageToCloudinary(
        imageFile,
        process.env.CLOUDINARY_UPLOAD_PRESET_PRODUCTS || ""
      );
      imageUrl = cloudinaryResponse.secure_url; // Save the secure URL
      publicId = cloudinaryResponse.public_id; // Save the public ID
    } catch (error: any) {
      console.error("Error uploading image to Cloudinary:", error.message);
      throw new Error("Failed to upload image to Cloudinary.");
    }
  }

  // Prepare the product data
  const productData = {
    ...data,
    imageUrl: imageUrl, // Update the image URL
    publicId: publicId, // Update the public ID
  };

  try {
    if (id) {
      // Update existing product
      await db.product.update({
        where: { id },
        data: productData,
      });
    } else {
      // Create new product
      await db.product.create({
        data: productData,
      });
    }
  } catch (error: any) {
    console.error("Error creating/updating product:", error);
    throw new Error("Failed to save product data.");
  }
}
