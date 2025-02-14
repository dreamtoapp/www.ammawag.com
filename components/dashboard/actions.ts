// app/dashboard/actions.ts
"use server";
// components/dashboard/actions.ts
import db from "@/lib/prisma";

export async function fetchOrders(status?: string) {
  try {
    const orders = await db.order.findMany({
      where: status ? { status } : {}, // Filter by status if provided
      select: {
        id: true,
        orderNumber: true,
        customerId: true,
        customerName: true,
        driverId: true,
        status: true,
        amount: true,
        items: {
          select: {
            productId: true,
            quantity: true,
            price: true,
          },
        },
      },
    });
    return orders;
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders.");
  }
}
export async function fetchAnalytics() {
  try {
    const allOrders = await db.order.findMany({
      select: {
        status: true, // Only need the status field for analytics
      },
    });

    // Calculate summary statistics
    const totalOrders = allOrders.length;
    const pendingOrders = allOrders.filter(
      (order) => order.status === "Pending"
    ).length;
    const deliveredOrders = allOrders.filter(
      (order) => order.status === "Delivered"
    ).length;

    return {
      totalOrders,
      pendingOrders,
      deliveredOrders,
    };
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    throw new Error("Failed to fetch analytics data.");
  }
}
