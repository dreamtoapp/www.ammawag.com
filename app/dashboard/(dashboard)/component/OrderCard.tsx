// components/OrderCard.tsx
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle, Truck, AlertCircle, XCircle, Info } from "lucide-react";
import { cn } from "../../../../lib/utils";

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string | null;
  driverId: string | null;
  status: string;
  amount: number; // Total amount of the order
  shift: string;
  // items: { productId: string; quantity: number; price: number }[]; // Include historical price
}

export default function OrderCard({ order }: { order: Order }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <AlertCircle className="mr-2 text-yellow-500" />;
      case "Delivered":
        return <CheckCircle className="mr-2 text-green-500" />;
      default:
        return <XCircle className="mr-2 text-red-500" />;
    }
  };

  const getCardStyles = (status: string) => {
    switch (status) {
      case "Pending":
        return "border-dashed border-yellow-500 bg-yellow-50";
      case "Delivered":
        return "border-solid border-green-500 bg-green-50";
      default:
        return "border-solid border-gray-300 bg-white";
    }
  };

  return (
    <Card className={`relative ${getCardStyles(order.status)}`}>
      {/* Status Indicator */}
      <div
        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
          order.status === "Pending"
            ? "bg-yellow-500 text-white"
            : order.status === "Delivered"
            ? "bg-green-500 text-white"
            : "bg-gray-500 text-white"
        }`}
      >
        {order.status}
      </div>

      {/* Card Header: Status and Order Number */}
      <CardHeader>
        <CardTitle className="flex items-center justify-end">
          {getStatusIcon(order.status)} {order.orderNumber}
        </CardTitle>
      </CardHeader>

      {/* Card Content: Customer Name, Total Amount, Payment Method */}
      <CardContent>
        <p>
          <strong>العميل:</strong> {order.customerName || "Unknown Customer"}
        </p>
        <p>
          <strong>إجمالي المبلغ:</strong> {order.amount.toFixed(2)} SAR
        </p>
        <p>
          <strong>موعد التسليم:</strong> {order.shift}
        </p>
        <p>
          <strong>طريقة الدفع:</strong> عند التسليم
        </p>
      </CardContent>

      {/* Card Footer: More Details and Ship Order Buttons with Icons */}
      <CardFooter className="flex justify-between">
        <Link
          href={`/dashboard/orders/${order.id}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }), // Use `buttonVariants` for consistent styling
            "flex items-center gap-2"
          )}
        >
          <Info className="h-4 w-4" /> More Details
        </Link>
        {order.status === "Pending" && (
          <Link
            href={`/dashboard/orders/${order.id}/ship`}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }), // Use `buttonVariants` for consistent styling
              "flex items-center gap-2"
            )}
          >
            <Truck className="h-4 w-4" /> Ship Order
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
