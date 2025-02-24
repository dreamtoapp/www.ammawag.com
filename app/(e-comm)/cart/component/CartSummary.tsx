import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "../helpers/formatCurrency";
import { ShoppingCart, Tag, DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CartSummary = () => {
  const { getTotalPrice, getTotalItems } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalWithTax = totalPrice * 1.15; // 15% tax
  const router = useRouter();

  return (
    <div className="bg-card text-foreground p-6 rounded-xl shadow-lg dark:shadow-gray-800/50 border border-gray-200 dark:border-gray-700 w-full max-w-sm">
      {/* Header */}
      <div className="flex flex-row-reverse items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          ملخص الطلب
          <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
        </h2>
        <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
          {getTotalItems()} منتج
        </div>
      </div>

      {/* Summary Items */}
      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex flex-row-reverse items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span>الإجمالي الفرعي</span>
          </div>
          <span className="font-medium">{formatCurrency(totalPrice)}</span>
        </div>

        {/* Tax */}
        <div className="flex flex-row-reverse items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>الضريبة (15%)</span>
          </div>
          <span className="font-medium">
            {formatCurrency(totalPrice * 0.15)}
          </span>
        </div>

        {/* Total */}
        <div className="flex flex-row-reverse items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-semibold">الإجمالي النهائي</span>
          </div>
          <span className="text-xl font-bold text-primary">
            {formatCurrency(totalWithTax)}
          </span>
        </div>

        {/* Checkout Button */}
        <Button
          className="w-full mt-6 h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
          size="lg"
          onClick={() => router.push("/")}
        >
          متابعة التسوق
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
