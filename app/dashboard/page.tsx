// app/dashboard/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for orders (replace this with actual data fetched from the database)
const mockOrders = [
  {
    id: "1",
    customerId: "C001",
    customerName: "John Doe",
    status: "Pending",
    items: [{ productId: "P001", quantity: 2 }],
    driverId: null,
  },
  {
    id: "2",
    customerId: "C002",
    customerName: "Jane Smith",
    status: "Delivered",
    items: [{ productId: "P002", quantity: 1 }],
    driverId: "D001",
  },
  {
    id: "3",
    customerId: "C003",
    customerName: "Alice Johnson",
    status: "Pending",
    items: [{ productId: "P003", quantity: 5 }],
    driverId: null,
  },
];

export default function DashboardPage() {
  // Function to handle assigning a driver to an order
  const handleAssignDriver = async (orderId: string) => {
    console.log(`Assigning driver to order ID: ${orderId}`);
    // Add logic here to assign a driver (e.g., update the database)
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* Orders as Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Customer:</strong> {order.customerName}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    Product: {item.productId}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Driver:</strong> {order.driverId || "Not Assigned"}
              </p>
              {!order.driverId && (
                <Button
                  variant="outline"
                  className="mt-4"
                  // onClick={() => handleAssignDriver(order.id)}
                >
                  Assign Driver
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
