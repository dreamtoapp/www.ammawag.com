// components/dashboard/OrderFilter.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFilterProps {
  initialFilter: string; // The currently selected filter (e.g., "All", "Pending", "Delivered")
}

export default function OrderFilter({ initialFilter }: OrderFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleFilterChange} defaultValue={initialFilter}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="اختر نوع الطلب" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">الكل</SelectItem>
        <SelectItem value="Pending">قيد الانتظار</SelectItem>
        <SelectItem value="Delivered">تم التسليم</SelectItem>
      </SelectContent>
    </Select>
  );
}
