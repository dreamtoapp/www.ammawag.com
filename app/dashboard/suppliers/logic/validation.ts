// app/dashboard/suppliers/validation.ts
import { z } from "zod";

// Define the validation schema for supplier data
export const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  phone: z.string().min(1, "Phone number is required."),
  address: z.string().min(1, "Address is required."),
});

// Infer the TypeScript type from the schema
export type SupplierFormData = z.infer<typeof supplierSchema>;
