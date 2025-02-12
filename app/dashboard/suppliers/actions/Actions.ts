// app/dashboard/suppliers/actions/supplierActions.ts
"use server";

import prisma from "../../../../lib/prisma";

// Create or Update Supplier
export async function createOrUpdateSupplier(id: string | null, data: any) {
  if (id) {
    // Update existing supplier
    await prisma.supplier.update({
      where: { id },
      data,
    });
  } else {
    // Create new supplier
    await prisma.supplier.create({ data });
  }
}

// Delete Supplier
export async function deleteSupplier(id: string) {
  await prisma.supplier.delete({
    where: { id },
  });
}

// Fetch All Suppliers
export async function getSuppliers() {
  return await prisma.supplier.findMany();
}
