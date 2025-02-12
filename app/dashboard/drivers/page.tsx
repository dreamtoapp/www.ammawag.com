// app/dashboard/drivers/page.tsx
import { notFound } from "next/navigation";
import DriverCard from "./components/DriverCard";
import AddDriverDialog from "./components/AddDriverDialog";
import { getDrivers } from "./actions/Actions";

export default async function DriversPage() {
  const drivers = await getDrivers();

  if (!drivers) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">Manage Drivers</h1>

      {/* Add New Driver Button */}
      <div className="flex justify-end">
        <AddDriverDialog>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Driver
          </button>
        </AddDriverDialog>
      </div>

      {/* Driver List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
}
