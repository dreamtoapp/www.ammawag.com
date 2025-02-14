// components/dashboard/DashboardHeader.tsx
"use client";
import { AlertCircle, CheckCircle, Package } from "lucide-react";
import OrderFilter from "./OrderFilter";

interface DashboardHeaderProps {
  initialFilter: string; // The currently selected filter (e.g., "All", "Pending", "Delivered")
  totalOrders: number; // Total number of orders
  pendingOrders: number; // Number of pending orders
  deliveredOrders: number; // Number of delivered orders
}

export default function DashboardHeader({
  initialFilter,
  totalOrders,
  pendingOrders,
  deliveredOrders,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 md:mb-0">الطلبيات</h1>

      {/* Analytics Section */}
      <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
        {/* Total Orders */}
        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
          <Package className="h-5 w-5 text-gray-600" />
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">إجمالي الطلبيات</p>
            <p className="font-semibold">{totalOrders}</p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="flex items-center gap-2 bg-yellow-100 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <div className="flex items-center gap-4">
            <p className="text-sm text-yellow-600">قيد الانتظار</p>
            <p className="font-semibold">{pendingOrders}</p>
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="flex items-center gap-2 bg-green-100 p-3 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div className="flex items-center gap-4">
            <p className="text-sm text-green-600">تم التسليم</p>
            <p className="font-semibold">{deliveredOrders}</p>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      <OrderFilter initialFilter={initialFilter} />
    </div>
  );
}
