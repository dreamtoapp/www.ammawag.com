"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CandyCane, CheckCircle, Package, X } from "lucide-react";
import OrderFilter from "./OrderFilter";

interface DashboardHeaderProps {
  initialFilter: string;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
}

export default function DashboardHeader({
  initialFilter,
  totalOrders,
  pendingOrders,
  deliveredOrders,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      {/* Title */}
      {/* <div className="flex flex-row items-center gap-2">
        <span className="text-3xl font-bold text-gray-800">📦 </span>
        <h1 className="text-3xl font-bold text-gray-800"> الطلبيات</h1>
      </div> */}

      {/* Analytics Section */}
      <div className="flex flex-wrap gap-4">
        {/* Total Orders */}
        <Card className="w-40 transition-all hover:scale-105 hover:shadow-md">
          <CardContent className="flex flex-row items-center justify-center gap-2 p-4">
            <div className="flex flex-row items-center gap-2">
              <Package className="h-6 w-6 text-gray-600" />
              <p className="text-sm text-gray-500"> الطلبيات</p>
              <p className="text-lg font-semibold">{totalOrders}</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card className="w-40 transition-all hover:scale-105 hover:shadow-md">
          <CardContent className="flex flex-row items-center gap-2 p-4">
            <div className="flex flex-row items-center gap-2">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <p className="text-sm text-yellow-600"> الانتظار</p>
              <p className="text-lg font-semibold">{pendingOrders}</p>
            </div>
          </CardContent>
        </Card>

        {/* Delivered Orders */}
        <Card className="w-40 transition-all hover:scale-105 hover:shadow-md">
          <CardContent className="flex flex-row items-center gap-2 p-4">
            <div className="flex flex-row items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <p className="text-sm text-green-600"> التسليم</p>
              <p className="text-lg font-semibold">{deliveredOrders}</p>
            </div>
          </CardContent>
        </Card>
        {/* Canceld Orders */}
        <Card className="w-40 transition-all hover:scale-105 hover:shadow-md">
          <CardContent className="flex flex-row items-center gap-2 p-4">
            <div className="flex flex-row items-center gap-2">
              <X className="h-6 w-6 text-red-600" />
              <p className="text-sm text-red-600">ملغي</p>
              <p className="text-lg font-semibold">{0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Dropdown */}
      <OrderFilter initialFilter={initialFilter} />
    </div>
  );
}
