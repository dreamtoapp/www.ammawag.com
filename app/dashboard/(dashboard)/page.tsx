// app/dashboard/page.tsx
import OrderCard from "./component/OrderCard";
import { fetchOrders, fetchAnalytics } from "./action/actions";
import DashboardHeader from "./component/DashboardHeader";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const statusFilter = resolvedSearchParams.status;

  const filteredOrders = await fetchOrders(statusFilter);
  const { totalOrders, pendingOrders, deliveredOrders } =
    await fetchAnalytics();

  return (
    <div className="relative space-y-6 font-cairo p-4 flex flex-col ">
      {/* Header */}
      <DashboardHeader
        initialFilter={statusFilter || "All"}
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        deliveredOrders={deliveredOrders}
      />

      {/* Pass all orders to OrderCard */}
      {/* @ts-ignore */}
      <OrderCard orders={filteredOrders} />
    </div>
  );
}
