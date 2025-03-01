"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Package, X } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  initialFilter: string; // The currently selected filter (e.g., "All", "Pending", "Delivered")
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
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle filter change
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
    <div className="sticky top-0 z-2 bg-secondary  shadow-md p-4 flex items-center justify-center w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Title */}
        <div className="flex flex-row items-center gap-2">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">الطلبيات</h1>
        </div>

        {/* Analytics Section */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {/* Total Orders */}
          <Link href="/dashboard">
            <Card
              className={`w-40 transition-all hover:scale-105 hover:shadow-md border border-input bg-background cursor-pointer ${
                initialFilter === "All" ? "border-primary shadow-md" : ""
              }`}
            >
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex flex-row items-center gap-2">
                  <Package className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">الطلبيات</p>
                  <p className="text-lg font-semibold text-foreground">
                    {totalOrders}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Pending Orders */}
          <Link href="?status=Pending">
            <Card
              className={`w-40 transition-all hover:scale-105 hover:shadow-md border border-input bg-background cursor-pointer ${
                initialFilter === "Pending" ? "border-yellow-500 shadow-md" : ""
              }`}
            >
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex flex-row items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                  <p className="text-sm text-yellow-500">قيد الانتظار</p>
                  <p className="text-lg font-semibold text-foreground">
                    {pendingOrders}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Delivered Orders */}
          <Link href="?status=Delivered">
            <Card
              className={`w-40 transition-all hover:scale-105 hover:shadow-md border border-input bg-background cursor-pointer ${
                initialFilter === "Delivered"
                  ? "border-green-500 shadow-md"
                  : ""
              }`}
            >
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex flex-row items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <p className="text-sm text-green-500">تم التسليم</p>
                  <p className="text-lg font-semibold text-foreground">
                    {deliveredOrders}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Cancelled Orders */}
          <Link href="?status=Cancelled">
            <Card
              className={`w-40 transition-all hover:scale-105 hover:shadow-md border border-input bg-background cursor-pointer ${
                initialFilter === "Cancelled" ? "border-red-500 shadow-md" : ""
              }`}
            >
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex flex-row items-center gap-2">
                  <X className="h-6 w-6 text-red-500" />
                  <p className="text-sm text-red-500">ملغي</p>
                  <p className="text-lg font-semibold text-foreground">0</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
