"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Header() {
  const { getTotalUniqueItems } = useCartStore();

  // Prevent Hydration Mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-primary  text-primary-foreground shadow-md p-4 flex justify-between items-center">
      {/* Logo/Brand Name */}
      <div className="text-xl font-bold text-primary-foreground">
        Ecommerce Platform
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-4">
        <Link href="/" className="  hover:text-blue-500">
          الرئيسية
        </Link>
        <Link href="/catalog" className="  hover:text-blue-500">
          المتجر
        </Link>
      </nav>

      {/* Cart Icon */}
      <div className="flex gap-4 items-center">
        <Link href="/cart" className="relative  hover:text-blue-500">
          <ShoppingCart size={24} />
          {mounted && getTotalUniqueItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500   text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalUniqueItems()}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
