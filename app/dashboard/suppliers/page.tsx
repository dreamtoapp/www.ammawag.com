// app/dashboard/suppliers/page.tsx
import SupplierCard from "./components/SupplierCard";
import AddSupplierDialog from "./components/AddSupplierDialog";
import { getSuppliers } from "./actions/Actions";

export default async function SuppliersPage() {
  // Fetch suppliers on the server side
  const suppliers = await getSuppliers();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Suppliers</h1>
      {/* Add Supplier Button */}
      <div className="flex justify-end">
        <AddSupplierDialog />
      </div>
      {/* Display Suppliers as Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier: any) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
}
