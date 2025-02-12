// app/dashboard/suppliers/components/DeleteSupplierAlert.tsx
"use client";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSupplier, getSupplierDetails } from "../actions/Actions";
import { Trash } from "lucide-react";

interface DeleteSupplierAlertProps {
  supplierId: string;
}

export default function DeleteSupplierAlert({
  supplierId,
}: DeleteSupplierAlertProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasProducts, setHasProducts] = useState<boolean>(false);

  useEffect(() => {
    // Fetch supplier details to check if it has related products
    const fetchSupplierDetails = async () => {
      const { hasProducts } = await getSupplierDetails(supplierId);
      setHasProducts(hasProducts);
    };

    fetchSupplierDetails();
  }, [supplierId]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteSupplier(supplierId);
      window.location.reload(); // Refresh the page after successful deletion
    } catch (error: any) {
      setMessage(error.message); // Display error message
    }
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-500 hover:underline">
          <Trash />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {hasProducts
              ? "This supplier is linked to one or more products. Please delete the associated products first."
              : "This action cannot be undone. The supplier will be permanently deleted."}
          </AlertDialogDescription>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {!hasProducts && (
            <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
