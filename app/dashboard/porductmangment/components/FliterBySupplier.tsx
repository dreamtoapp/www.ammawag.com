"use client"; // Mark as a Client Component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Package } from "lucide-react"; // Import Lucide icon for visual enhancement

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
      {/* Label with Icon */}
      <label
        htmlFor="supplier"
        className="text-sm font-medium text-foreground flex items-center gap-2"
      >
        <Package className="h-4 w-4 text-primary" />{" "}
        {/* Use 'text-primary' for the icon */}
        عرض المنتجات حسب
      </label>
      {/* Select Dropdown */}
      <Select value={currentSupplierId} onValueChange={handleSupplierChange}>
        <SelectTrigger id="supplier" className="w-[200px]">
          <SelectValue placeholder="اختر موردًا" />
        </SelectTrigger>
        <SelectContent>
          {/* Option for All Suppliers */}
          <SelectItem value="all" className="text-primary font-medium">
            جميع الموردين
          </SelectItem>
          {/* Options for Individual Suppliers */}
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
