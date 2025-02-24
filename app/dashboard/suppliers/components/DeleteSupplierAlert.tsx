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
import { deleteSupplier, getSupplierDetails } from "../actions/supplierActions";
import { Trash } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";

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
      try {
        const { hasProducts } = await getSupplierDetails(supplierId);
        setHasProducts(hasProducts);
      } catch (error: any) {
        console.error("Error fetching supplier details:", error.message);
      }
    };
    fetchSupplierDetails();
  }, [supplierId]);

  const handleDelete = async () => {
    setIsLoading(true);
    setMessage(null); // Clear previous messages
    try {
      await deleteSupplier(supplierId);
      window.location.reload(); // Refresh the page after successful deletion
    } catch (error: any) {
      setMessage(error.message || "حدث خطأ أثناء حذف المورد.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-foreground border-border shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            هل أنت متأكد؟
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            {hasProducts ? (
              <>
                هذا المورد مرتبط بواحد أو أكثر من المنتجات. يرجى حذف المنتجات
                المرتبطة أولاً.
              </>
            ) : (
              <>لا يمكن التراجع عن هذا الإجراء. سيتم حذف المورد بشكل دائم.</>
            )}
          </AlertDialogDescription>
          {message && (
            <p className="mt-2 text-sm text-destructive">{message}</p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-input bg-background hover:bg-accent">
            إلغاء
          </AlertDialogCancel>
          {!hasProducts && (
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري
                  الحذف...
                </>
              ) : (
                "حذف"
              )}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
