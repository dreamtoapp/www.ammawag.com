"use client";
import React, { useState, useEffect, useCallback } from "react";
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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  User,
  Phone,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FaFileInvoice } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { OrderCartItem } from "../../../../types/order";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the Order interface
interface Order {
  id: string;
  orderNumber: string;
  customerName: string | null;
  status: string;
  amount: number;
  shift: { name: string };
  createdAt: string;
  updatedAt: string;
  items: OrderCartItem[];
  customer: {
    phone: string;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
  };
}

// Status styles with enhanced light and dark mode support
const STATUS_STYLES: Record<
  string,
  {
    border: string;
    bgLight: string;
    bgDark: string;
    textLight: string;
    textDark: string;
  }
> = {
  Pending: {
    border: "border-l-4 border-yellow-500",
    bgLight: "bg-yellow-50",
    bgDark: "dark:bg-yellow-900/30",
    textLight: "text-yellow-800",
    textDark: "dark:text-yellow-200",
  },
  Delivered: {
    border: "border-l-4 border-green-500",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-900/30",
    textLight: "text-green-800",
    textDark: "dark:text-green-200",
  },
  "In Transit": {
    border: "border-l-4 border-blue-500",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-900/30",
    textLight: "text-blue-800",
    textDark: "dark:text-blue-200",
  },
  Cancelled: {
    border: "border-l-4 border-red-500",
    bgLight: "bg-red-50",
    bgDark: "dark:bg-red-900/30",
    textLight: "text-red-800",
    textDark: "dark:text-red-200",
  },
  Default: {
    border: "border-l-4 border-gray-300",
    bgLight: "bg-gray-50",
    bgDark: "dark:bg-gray-800",
    textLight: "text-gray-800",
    textDark: "dark:text-gray-200",
  },
};

// StatusIcon component for displaying status-specific icons
const StatusIcon = ({ status }: { status: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Pending: <AlertCircle className="text-yellow-500 h-4 w-4" />,
    Delivered: <CheckCircle className="text-green-500 h-4 w-4" />,
    "In Transit": <Truck className="text-blue-500 h-4 w-4" />,
    Cancelled: <XCircle className="text-red-500 h-4 w-4" />,
  };
  return icons[status] || <Info className="text-gray-500 h-4 w-4" />;
};

// OrderTableRow component for table view
const OrderTableRow = ({
  order,
  openDialog,
}: {
  order: Order;
  openDialog: (order: Order) => void;
}) => {
  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.Default;

  return (
    <motion.tr
      key={order.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${statusStyle.bgLight} ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark} hover:bg-opacity-90 dark:hover:bg-opacity-10`}
    >
      <TableCell className="font-semibold">{order.orderNumber}</TableCell>
      <TableCell>{order.customerName || "Unknown Customer"}</TableCell>
      <TableCell className="text-right font-semibold">
        {order.amount.toFixed(2)} SAR
      </TableCell>
      <TableCell>
        <Badge
          className={`bg-opacity-75 ${statusStyle.bgLight} ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark}`}
        >
          <StatusIcon status={order.status} /> {order.status}
        </Badge>
      </TableCell>
      <TableCell>
        <p className="text-sm text-muted-foreground">
          Created:{" "}
          {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
        </p>
        <p className="text-sm text-muted-foreground">
          Updated:{" "}
          {formatDistanceToNow(new Date(order.updatedAt), { addSuffix: true })}
        </p>
      </TableCell>
      <TableCell className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          aria-label="View Details"
          onClick={() => openDialog(order)}
        >
          <Info className="h-4 w-4" />
        </Button>
        {order.status === "In Transit" && (
          <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
            <Button variant="default" size="sm" aria-label="Track Order">
              <MapPin className="h-4 w-4" />
            </Button>
          </Link>
        )}
        {order.status === "Pending" && (
          <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
            <Button
              variant="default"
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white"
              aria-label="Ship Order"
            >
              <TruckIcon className="h-4 w-4" />
            </Button>
          </Link>
        )}
        {order.status === "Delivered" && (
          <Link href={`/dashboard/orders/${order.orderNumber}/invoice`}>
            <Button
              variant="default"
              size="sm"
              className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white"
              aria-label="View Invoice"
            >
              <FaFileInvoice className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </TableCell>
    </motion.tr>
  );
};

// OrderCard component for card view
const OrderCard = ({
  order,
  openDialog,
}: {
  order: Order;
  openDialog: (order: Order) => void;
}) => {
  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.Default;

  return (
    <Card
      className={`shadow-md rounded-lg ${statusStyle.border} ${statusStyle.bgLight} ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark}`}
    >
      <CardHeader className="flex flex-col gap-2">
        <div className="text-sm text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p>
              {formatDistanceToNow(new Date(order.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            <p>
              {formatDistanceToNow(new Date(order.updatedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center gap-2">
            <List className="h-4 w-4 text-muted-foreground" />
            {order.orderNumber}
          </CardTitle>
          <CardTitle className="text-lg font-semibold">
            {order.amount.toFixed(2)} SAR
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription className="text-sm flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          {order.customer.name || "Unknown Customer"}
        </CardDescription>
        <CardDescription className="text-sm flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          {order.customer.phone || "No phone provided"}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        <Badge
          className={`bg-opacity-75 ${statusStyle.bgLight} ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark}`}
        >
          <StatusIcon status={order.status} /> {order.status}
        </Badge>
        <div className="flex gap-2 justify-end w-full">
          <Button variant="outline" size="sm" onClick={() => openDialog(order)}>
            <Info className="h-4 w-4" /> Details
          </Button>
          {order.status === "In Transit" && (
            <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
              <Button variant="default" size="sm">
                <MapPin className="h-4 w-4" /> Track
              </Button>
            </Link>
          )}
          {order.status === "Pending" && (
            <Link href={`/dashboard/orders/${order.orderNumber}/track`}>
              <Button
                variant="default"
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white"
              >
                <TruckIcon className="h-4 w-4" /> Ship
              </Button>
            </Link>
          )}
          {order.status === "Delivered" && (
            <Link href={`/dashboard/orders/${order.orderNumber}/invoice`}>
              <Button
                variant="default"
                size="sm"
                className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white"
              >
                <FaFileInvoice className="h-4 w-4" /> Invoice
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

// OrderViewSwitcher component to toggle between table and card views
const OrderViewSwitcher = ({
  viewMode,
  toggleViewMode,
}: {
  viewMode: "table" | "cards";
  toggleViewMode: () => void;
}) => {
  return (
    <div className="flex justify-end mb-4">
      <Button onClick={toggleViewMode} variant="outline" size="sm">
        {viewMode === "table" ? (
          <LayoutGrid className="h-5 w-5" />
        ) : (
          <List className="h-5 w-5" />
        )}
        <span className="ml-2">Switch View</span>
      </Button>
    </div>
  );
};

// Main OrderList component
export default function OrderList({ orders }: { orders: Order[] }) {
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Load view mode from localStorage and set loading state
  useEffect(() => {
    const savedView = localStorage.getItem("orderListViewMode");
    if (savedView === "table" || savedView === "cards") setViewMode(savedView);
    setLoading(false);
  }, []);

  // Toggle between table and card views
  const toggleViewMode = useCallback(() => {
    const newView = viewMode === "table" ? "cards" : "table";
    setViewMode(newView);
    localStorage.setItem("orderListViewMode", newView);
  }, [viewMode]);

  // Open the dialog with selected order details
  const openDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  // Handle print for driver
  const handlePrint = () => {
    if (!selectedOrder) return;

    const printContent = `
      <html>
        <head>
          <title>Order ${selectedOrder.orderNumber} - Print</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #000;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Delivery Note</h1>
          <p><strong>Order Number:</strong> ${selectedOrder.orderNumber}</p>
          <p><strong>Customer:</strong> ${selectedOrder.customer.name}</p>
          <p><strong>Address:</strong> ${selectedOrder.customer.address}</p>
          <p><strong>Phone:</strong> ${selectedOrder.customer.phone}</p>
          <h2>Items</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${selectedOrder.items
                .map(
                  (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>${item.price.toFixed(2)} SAR</td>
                      <td>${(item.quantity * item.price).toFixed(2)} SAR</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
          <p><strong>Total Amount:</strong> ${selectedOrder.amount.toFixed(
            2
          )} SAR</p>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    }
  };

  // Loading state with skeleton placeholders
  if (loading) {
    return viewMode === "table" ? (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamps</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-md rounded-lg">
            <CardHeader>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <div>
        <OrderViewSwitcher
          viewMode={viewMode}
          toggleViewMode={toggleViewMode}
        />
        <p className="text-center text-muted-foreground">
          No orders to display
        </p>
      </div>
    );
  }

  // Main content with table or card view
  return (
    <div>
      <OrderViewSwitcher viewMode={viewMode} toggleViewMode={toggleViewMode} />
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamps</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <OrderTableRow
                  key={order.id}
                  order={order}
                  openDialog={openDialog}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} openDialog={openDialog} />
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Dialog for Order Details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Order Details - {selectedOrder?.orderNumber}
            </DialogTitle>
            <DialogDescription>
              Status: {selectedOrder?.status} • Shift:{" "}
              {selectedOrder?.shift.name}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] overflow-y-auto">
            {selectedOrder && (
              <div className="space-y-6 p-4">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold">
                    Customer Information
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedOrder.customer.name || "Unknown"}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {selectedOrder.customer.phone || "Not provided"}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {selectedOrder.customer.address || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold">Order Items</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={crypto.randomUUID() + index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price.toFixed(2)} SAR</TableCell>
                          <TableCell>
                            {(item.quantity * item.price).toFixed(2)} SAR
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Totals */}
                <div>
                  <h3 className="text-lg font-semibold">Totals</h3>
                  <div className="mt-2 space-y-1">
                    <p>
                      <strong>Total Amount:</strong>{" "}
                      {selectedOrder.amount.toFixed(2)} SAR
                    </p>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
          <DialogFooter>
            <Button onClick={handlePrint}>Print for Driver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
