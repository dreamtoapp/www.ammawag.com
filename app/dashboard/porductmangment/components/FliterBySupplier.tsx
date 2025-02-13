// app/dashboard/products/components/FilterBySupplier.tsx
"use client"; // Mark as a Client Component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface Supplier {
  id: string;
  name: string;
}

interface FilterBySupplierProps {
  suppliers: Supplier[]; // List of suppliers to populate the dropdown
}

export default function FilterBySupplier({ suppliers }: FilterBySupplierProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current supplierId from the query parameters
  const currentSupplierId = searchParams.get("supplierId") || "all"; // Default to "all" if no supplierId is present

  // Handle supplier selection
  const handleSupplierChange = (supplierId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (supplierId === "all") {
      params.delete("supplierId"); // Remove the supplierId parameter for "All Suppliers"
    } else {
      params.set("supplierId", supplierId); // Add or update the supplierId parameter
    }

    // Update the URL with the new query parameters
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="supplier" className="text-sm font-medium text-gray-700">
        Filter by Supplier:
      </label>
      <Select value={currentSupplierId} onValueChange={handleSupplierChange}>
        <SelectTrigger id="supplier" className="w-[200px]">
          <SelectValue placeholder="Select a supplier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Suppliers</SelectItem>{" "}
          {/* Use "all" as the value */}
          {suppliers.map((supplier) => (
            <SelectItem key={supplier.id} value={supplier.id}>
              {supplier.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
