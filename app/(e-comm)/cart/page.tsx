"use client";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import CartItem from "./component/CartItem";
import CartSummary from "./component/CartSummary";
import CheckOut from "./component/CheckOut";
import Shopping from "./component/Shopping";

export default function CartPage() {
  const { getTotalItems, getTotalPrice, cart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const router = useRouter();

  // حساب المجموع مع الضريبة
  const totalWithTax = useMemo(() => {
    const total = getTotalPrice();
    return total + total * 0.15; // إضافة 15% ضريبة القيمة المضافة
  }, [cart, getTotalPrice]);

  useEffect(() => {
    setMounted(true);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate 2 seconds loading time
  }, []);

  if (!mounted) return null; // تأخير العرض حتى تحميل الصفحة بشكل كامل

  return (
    <div className="p-8 bg-background min-h-screen flex flex-col items-center space-y-6 rounded-t-3xl">
      {/* إذا كانت السلة فارغة */}
      {getTotalItems() === 0 ? (
        <div className="flex flex-col items-center justify-center h-[300px] space-y-6 text-center">
          <h3 className="text-2xl font-semibold text-foreground">
            السلة فارغة حالياً
          </h3>
          <p className="text-md text-muted-foreground">ابدأ التسوق الآن!</p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 ease-out transform hover:scale-105"
            onClick={() => router.push("/")}
          >
            تصفح المنتجات
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-8 w-full max-w-7xl">
          {/* قائمة المنتجات في السلة */}
          <div className="space-y-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg flex space-x-4 p-4"
                  >
                    <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                    </div>
                  </div>
                ))
              : Object.values(cart).map(({ product, quantity }) => (
                  <CartItem
                    key={product.id} // استخدام key بشكل صحيح مع معرف المنتج
                    product={product}
                    quantity={quantity}
                  />
                ))}
          </div>

          {/* ملخص السلة */}
          <div className="sticky top-24 bg-card text-foreground p-5 rounded-xl shadow-lg dark:shadow-gray-800/50  w-full max-w-sm self-start">
            {isLoading ? (
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg space-y-4 p-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ) : (
              <CartSummary />
            )}
          </div>
        </div>
      )}

      {/* زر متابعة عملية الشراء في الأسفل */}
      <div className="fixed bottom-0 left-0 right-0 bg-background shadow-lg dark:shadow-gray-800/50 flex justify-center gap-4 z-50 rounded-t-3xl p-4">
        {isLoading ? (
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-12 w-48 rounded-lg"></div>
        ) : (
          <CheckOut amout={totalWithTax} productCount={getTotalItems()} />
        )}
        {/* <Shopping /> */}
      </div>
    </div>
  );
}
