"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// تعريف نوع المورد
interface Supplier {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

// بيانات الموردين مع صور حقيقية من Unsplash
const suppliers: Supplier[] = [
  {
    id: "1",
    name: "المورد الأول",
    description: "هذا المورد متخصص في المنتجات عالية الجودة",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "المورد الثاني",
    description: "مورد موثوق به يقدم حلول مبتكرة",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "المورد الثالث",
    description: "يتميز هذا المورد بتقديم خدمات متكاملة",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "المورد الرابع",
    description: "مورد يقدم أسعار تنافسية في السوق",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: "5",
    name: "المورد الخامس",
    description: "مورد يتميز بسرعة التسليم وخدمة العملاء الممتازة",
    avatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: "6",
    name: "المورد السادس",
    description: "مورد يقدم حلولاً ذكية للمنتجات",
    avatar:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: "7",
    name: "المورد السابع",
    description: "مورد لديه شبكة توزيع قوية",
    avatar:
      "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: "8",
    name: "المورد الثامن",
    description: "مورد معروف بجودة منتجاته",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: "9",
    name: "المورد التاسع",
    description: "مورد موثوق به في السوق المحلي",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60",
  },
];

const ProductCategory = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  return (
    <div className="bg-gray-50 p-6 rtl text-right w-full max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">الموردون</h2>
        {selectedSupplier && (
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => setSelectedSupplier(null)}
          >
            إزالة التصفية
          </Button>
        )}
      </div>
      <ScrollArea className="w-full rounded-lg border bg-white shadow-sm overflow-x-auto">
        <div className="flex space-x-4 p-4">
          {suppliers.map((supplier) => (
            <Popover key={supplier.id}>
              <PopoverTrigger>
                <div
                  className={`cursor-pointer rounded-lg p-1 transition-all flex-shrink-0 w-20 h-20 flex justify-center items-center ${
                    selectedSupplier?.id === supplier.id
                      ? "border-2 border-blue-500 shadow-md"
                      : "hover:scale-105 hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedSupplier(supplier)}
                >
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={supplier.avatar} alt={supplier.name} />
                    <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="text-sm text-gray-700 p-4 shadow-lg rounded-lg w-72 relative bg-white">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={supplier.avatar} alt={supplier.name} />
                    <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{supplier.name}</p>
                    <p className="text-gray-500 text-sm">
                      {supplier.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                    تصفية المورد
                  </Button>
                  <Button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md w-full">
                    المزيد عن المورد
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProductCategory;
