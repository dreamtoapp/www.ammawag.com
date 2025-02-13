"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import DeleteSupplierAlert from "./DeleteSupplierAlert";
import EditSupplierDialog from "./EditSupplierDialog";

interface SupplierCardProps {
  supplier: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo: string | null;
    publicId: string | null;
    productCount: number;
  };
}

export default function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden border border-gray-300 flex flex-col h-full rtl">
      {/* رأس البطاقة */}
      <CardHeader className="p-4 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
        <CardTitle className="text-xl font-bold text-gray-900">
          {supplier.name}
        </CardTitle>
        <div className="flex space-x-2">
          {/* حوار تعديل المورد */}
          <EditSupplierDialog supplier={supplier} />
          {/* تنبيه حذف المورد */}
          <DeleteSupplierAlert supplierId={supplier.id} />
        </div>
      </CardHeader>

      {/* محتوى البطاقة */}
      <CardContent className="flex-grow p-4 space-y-4">
        {/* شعار المورد */}
        <div className="w-full h-48 sm:h-64 relative">
          {supplier.logo ? (
            <Image
              src={supplier.logo}
              alt={`شعار ${supplier.name}`}
              fill
              className="object-cover object-center rounded-md shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "/default-logo.png";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">لا يوجد شعار</span>
            </div>
          )}
        </div>

        {/* تفاصيل المورد */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            <strong>البريد الإلكتروني:</strong> {supplier.email}
          </p>
          <p className="text-sm text-gray-700">
            <strong>رقم الهاتف:</strong> {supplier.phone}
          </p>
          <p className="text-sm text-gray-700">
            <strong>العنوان:</strong> {supplier.address}
          </p>
        </div>
      </CardContent>

      {/* تذييل البطاقة */}
      <CardFooter className="p-4 bg-gray-100 border-t border-gray-300 flex justify-between items-center">
        {/* عدد المنتجات */}
        <div className="text-sm text-gray-700">
          {supplier.productCount > 0 ? (
            <span>{supplier.productCount} منتج</span>
          ) : (
            <span>لا توجد منتجات</span>
          )}
        </div>

        {/* زر إدارة/إضافة المنتجات */}
        {supplier.productCount > 0 ? (
          <Link href={`/dashboard/products?supplierId=${supplier.id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              إدارة المنتجات
            </button>
          </Link>
        ) : (
          <Link href={`/dashboard/products/add?supplierId=${supplier.id}`}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
              إضافة منتج
            </button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
