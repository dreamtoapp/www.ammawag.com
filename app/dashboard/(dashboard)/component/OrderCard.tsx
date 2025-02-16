"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Truck,
  AlertCircle,
  XCircle,
  Info,
  MapPin,
  LayoutGrid,
  List,
  TruckIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FaFileInvoice } from "react-icons/fa";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string | null;
  status: string;
  amount: number;
  shift: { name: string };
  //  items: { productId: string; quantity: number; price: number }[]; // Include historical price
}

const STATUS_STYLES: Record<Order["status"], string> = {
  Pending: "text-yellow-700 bg-yellow-100",
  Delivered: "text-green-700 bg-green-100",
  "In Transit": "text-blue-700 bg-blue-100",
  Cancelled: "text-red-700 bg-red-100",
};

const StatusIcon = ({ status }: { status: Order["status"] }) => {
  const icons: Record<Order["status"], React.ReactNode> = {
    Pending: <AlertCircle className="text-yellow-500" />,
    Delivered: <CheckCircle className="text-green-500" />,
    "In Transit": <Truck className="text-blue-500" />,
    Cancelled: <XCircle className="text-red-500" />,
  };
  return icons[status];
};

const TableRow = ({ order }: { order: Order }) => (
  <motion.tr
    key={order.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
  >
    <td className="py-4 px-6 font-semibold">{order.orderNumber}</td>
    <td className="py-4 px-6">{order.customerName || "Unknown Customer"}</td>
    <td className="py-4 px-6 font-semibold">{order.amount.toFixed(2)} SAR</td>
    <td className="py-4 px-6">
      <span
        className={`px-3 py-1 rounded-md flex items-center gap-2 ${
          STATUS_STYLES[order.status]
        }`}
      >
        <StatusIcon status={order.status} /> {order.status}
      </span>
    </td>
    <td className="py-4 px-6 flex gap-2">
      <Link href={`/dashboard/orders/${order.orderNumber}`}>
        <Button variant="outline" size="sm">
          <Info className="h-4 w-4" />
        </Button>
      </Link>
      {order.status === "In Transit" && (
        <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
          <Button variant="default" size="sm" className="bg-blue-500">
            <MapPin className="h-4 w-4" />
          </Button>
        </Link>
      )}
      {order.status === "Pending" && (
        <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
          <Button
            variant="default"
            size="sm"
            className="bg-yellow-400 text-black"
          >
            <TruckIcon className="h-4 w-4" />
          </Button>
        </Link>
      )}
      {order.status === "Delivered" && (
        <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
          <Button variant="default" size="sm" className="bg-green-500">
            <FaFileInvoice className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </td>
  </motion.tr>
);

const CardViewItem = ({ order }: { order: Order }) => (
  <motion.div
    key={order.id}
    whileHover={{ scale: 1.05 }}
    className={`shadow-md rounded-lg p-4 border transition-all duration-300 ${
      STATUS_STYLES[order.status] ?? ""
    }`}
  >
    <Card>
      <CardHeader>
        <CardTitle>{order.orderNumber}</CardTitle>
        <CardDescription>
          {order.customerName || "Unknown Customer"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{order.amount.toFixed(2)} SAR</p>
        {/* Display Status with Icon */}
        <div className="mt-2 flex items-center gap-2 text-sm">
          <StatusIcon status={order.status} />
          <span className={`${STATUS_STYLES[order.status]} px-2 py-1 rounded`}>
            {order.status}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/dashboard/orders/${order.orderNumber}`}>
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4" /> تفاصيل
          </Button>
        </Link>
        {order.status === "In Transit" && (
          <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
            <Button variant="default" size="sm">
              <MapPin className="h-4 w-4" /> متابعة
            </Button>
          </Link>
        )}

        {order.status === "Pending" && (
          <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
            <Button
              variant="default"
              size="sm"
              className="bg-yellow-400 text-black"
            >
              <TruckIcon className="h-4 w-4" /> شحن
            </Button>
          </Link>
        )}
        {order.status === "Delivered" && (
          <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
            <Button variant="default" size="sm" className="bg-green-500">
              <FaFileInvoice className="h-4 w-4" /> فاتورة
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  </motion.div>
);

export default function OrderCard({ orders }: { orders: Order[] }) {
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedView = localStorage.getItem("viewMode");
    if (savedView === "table" || savedView === "cards") setViewMode(savedView);
    setLoading(false);
  }, []);

  const toggleViewMode = () => {
    const newView = viewMode === "table" ? "cards" : "table";
    setViewMode(newView);
    localStorage.setItem("viewMode", newView);
  };

  if (loading) return <Skeleton className="h-10 w-full" />;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={toggleViewMode} variant="outline">
          {viewMode === "table" ? (
            <LayoutGrid className="h-5 w-5" />
          ) : (
            <List className="h-5 w-5" />
          )}{" "}
          Switch View
        </Button>
      </div>
      {viewMode === "table" ? (
        <motion.table className="w-full border-collapse rounded-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-6">Order #</th>
              <th className="py-2 px-6">Customer</th>
              <th className="py-2 px-6">Total</th>
              <th className="py-2 px-6">Status</th>
              <th className="py-2 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <TableRow key={order.id} order={order} />
            ))}
          </tbody>
        </motion.table>
      ) : (
        <AnimatePresence>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {orders.map((order) => (
              <CardViewItem key={order.id} order={order} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
