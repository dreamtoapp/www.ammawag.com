"use server";

import prisma from "@/lib/prisma";

// Define the User type
export type UserWithOrders = {
  id: string;
  phone: string;
  name: string;
  email: string | null;
  role: string;
  address: string | null;
  isOtp: boolean;
  latitude: string;
  longitude: string;
  orders: { id: string; status: string; orderNumber: string }[];
};

// Fetch users with search and role filters
export async function getUsers(
  search: string,
  role: string
): Promise<UserWithOrders[]> {
  try {
    return await prisma.user.findMany({
      where: {
        OR: [
          { phone: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
        role: role || undefined,
      },
      include: {
        orders: {
          select: {
            id: true,
            status: true,
            orderNumber: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

// Update a user
export async function updateUser(
  userId: string,
  data: Partial<UserWithOrders>
) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        phone: data.phone,
        name: data.name,
        email: data.email,
        address: data.address,
        role: data.role,
        isOtp: data.isOtp,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

// Delete a user
export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}
