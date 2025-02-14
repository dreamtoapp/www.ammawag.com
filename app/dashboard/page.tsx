// app/dashboard/page.tsx
import {
  fetchOrders,
  fetchAnalytics,
} from "../../components/dashboard/actions";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import OrderCard from "../../components/dashboard/OrderCard";

export default async function DashboardPage({
  searchParams, // Define searchParams as a Promise
}: {
  searchParams: Promise<{ status?: string }>; // searchParams is now a Promise
}) {
  // Resolve the searchParams Promise
  const resolvedSearchParams = await searchParams;
  const statusFilter = resolvedSearchParams.status;

  // Fetch filtered orders for display
  const filteredOrders = await fetchOrders(statusFilter);

  // Fetch analytics data from the entire database
  const { totalOrders, pendingOrders, deliveredOrders } =
    await fetchAnalytics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        initialFilter={statusFilter || "All"}
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        deliveredOrders={deliveredOrders}
      />
      {/* Orders as Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={{
              id: order.id,
              orderNumber: order.orderNumber,
              customerId: order.customerId,
              customerName: order.customerName,
              driverId: order.driverId,
              status: order.status,
              amount: order.amount,
              items: order.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
              })),
            }}
          />
        ))}
      </div>
    </div>
  );
}
