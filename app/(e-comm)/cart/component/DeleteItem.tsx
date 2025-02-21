import React from "react";
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
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteItemDialogProps {
  productId: string;
  productName: string;
  removeItem: (id: string) => void;
}

const DeleteItemDialog = ({
  productId,
  productName,
  removeItem,
}: DeleteItemDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className=" w-[80%] h-8  text-red-500 border-red-500 hover:bg-red-100 transition-colors font-cairo"
          aria-label={`Remove ${productName} from cart`}
        >
          <Trash2 size={16} />
          ازالة الصنف
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
          <AlertDialogDescription>
            هل تريد حذف المنتج "{productName}" من السلة؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => removeItem(productId)}
            className="bg-red-600 hover:bg-red-700"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItemDialog;
