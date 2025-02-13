"use server";
import db from "../../../../lib/prisma";

export const getAllProduct = async () => {
  const product = await db.product.findMany();
  return product;
};
