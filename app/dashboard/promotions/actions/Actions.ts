"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fetch all promotions
export async function fetchPromotions() {
  try {
    const promotions = await db.promotion.findMany();
    return promotions;
  } catch (error) {
    console.error("Error fetching promotions:", error);
    throw new Error("Failed to fetch promotions");
  }
}

// Add a new promotion
export async function addPromotion(formData: FormData) {
  try {
    const promotion = await db.promotion.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        imageUrl: formData.get("imageUrl") as string,
        productIds: JSON.parse(formData.get("productIds") as string),
      },
    });

    revalidatePath("/offers"); // Refresh the page
    return promotion;
  } catch (error) {
    console.error("Error adding promotion:", error);
    throw new Error("Failed to add promotion");
  }
}

// Remove a promotion
export async function removePromotion(promotionId: string) {
  try {
    await db.promotion.delete({
      where: { id: promotionId },
    });

    revalidatePath("/offers"); // Refresh the page
  } catch (error) {
    console.error("Error removing promotion:", error);
    throw new Error("Failed to remove promotion");
  }
}

// Toggle promotion active status
export async function togglePromotionStatus(
  promotionId: string,
  active: boolean
) {
  try {
    await db.promotion.update({
      where: { id: promotionId },
      data: { active },
    });

    revalidatePath("/offers"); // Refresh the page
  } catch (error) {
    console.error("Error toggling promotion status:", error);
    throw new Error("Failed to toggle promotion status");
  }
}
