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
  const router = useRouter();

  // حساب المجموع مع الضريبة
  const totalWithTax = useMemo(() => {
    const total = getTotalPrice();
    return total + total * 0.15; // إضافة 15% ضريبة القيمة المضافة
  }, [cart, getTotalPrice]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // تأخير العرض حتى تحميل الصفحة بشكل كامل

  return (
    <div className="p-8  bg-gray-100  min-h-screen flex flex-col items-center space-y-6 rounded-t-3xl">
      {/* إذا كانت السلة فارغة */}
      {getTotalItems() === 0 ? (
        <div className="flex flex-col items-center justify-center h-[300px] space-y-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800  ">
            السلة فارغة حالياً
          </h3>
          <p className="text-md text-gray-500  ">ابدأ التسوق الآن!</p>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 transition-transform duration-200 ease-out transform hover:scale-105"
            onClick={() => router.push("/")}
          >
            تصفح المنتجات
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-8 w-full max-w-7xl">
          {/* قائمة المنتجات في السلة */}
          <div className="space-y-6">
            {Object.values(cart).map(({ product, quantity }) => (
              <CartItem
                key={product.id} // استخدام key بشكل صحيح مع معرف المنتج
                product={product}
                quantity={quantity}
              />
            ))}
          </div>

          <div className="sticky top-24 bg-card text-foreground p-5 rounded-xl shadow-sm border w-full max-w-sm self-start font-cairo">
            <CartSummary />
          </div>
        </div>
      )}

      {/* زر متابعة عملية الشراء في الأسفل */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100  shadow-lg   flex justify-center gap-4 z-50 rounded-t-3xl">
        <CheckOut
          amout={getTotalPrice() * 0.15}
          productCount={getTotalItems()}
        />
        {/* <Shopping /> */}
      </div>
    </div>
  );
}
