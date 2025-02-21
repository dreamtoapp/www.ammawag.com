"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DollarSign, Check } from "lucide-react";
import { FaCartPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PRIMARY_COLOR =
  "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md rounded-full";

export default function ProductList({ products }: { products: Product[] }) {
  const { addItem, removeItem, cart } = useCartStore();

  // State for tracking quantities
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  // State for tracking notifications inside each card
  const [notifications, setNotifications] = useState<{
    [key: string]: boolean;
  }>({});

  // Function to update quantity
  const updateQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + delta), // Ensure quantity >= 1
    }));
  };

  // Function to handle adding to cart and showing notification/checkmark
  const handleAddToCart = (
    productId: string,
    quantity: number,
    product: Product
  ) => {
    addItem(product, quantity);

    // Show the temporary notification
    setNotifications((prev) => ({ ...prev, [productId]: true }));

    // Hide the notification after 2 seconds
    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="rounded-2xl shadow-md overflow-hidden relative bg-white border-gray-200"
        >
          {/* Persistent Checkmark */}
          {cart[product.id] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-2 shadow-lg"
            >
              <Check size={16} />
            </motion.div>
          )}

          {/* Temporary Notification */}
          <AnimatePresence>
            {notifications[product.id] && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-green-100 text-green-800"
              >
                <span className="text-sm font-medium">تمت الإضافة!</span>
                <Check size={16} className="text-green-600" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Image */}
          <CardHeader className="p-0 relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
              priority
            />
          </CardHeader>

          <CardContent className="space-y-2 p-4 text-center">
            {/* Product Name */}
            <CardTitle className="text-base font-bold text-gray-800">
              {product.name}
            </CardTitle>

            {/* Price */}
            <div className="flex justify-between items-center text-sm font-semibold text-gray-900">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-amber-500" />
                <span>{product.price.toFixed(2)} $</span>
              </div>
            </div>

            {/* Quantity Buttons */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, -1)}
                className="w-8 h-8 text-sm border border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-full"
              >
                -
              </Button>
              <span className="text-sm font-medium text-gray-700">
                {quantities[product.id]}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, 1)}
                className="w-8 h-8 text-sm border border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-full"
              >
                +
              </Button>
            </div>

            {/* Total Price */}
            <div className="mt-2 bg-gray-100 p-2 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-900">
                <span>الإجمالي:</span>
                <span className="text-black">
                  ${(quantities[product.id] * product.price).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>

          {/* Add to Cart Button with React Bits Effect */}
          <CardFooter className="p-4 flex justify-center items-center">
            <button
              onClick={() =>
                handleAddToCart(product.id, quantities[product.id], product)
              }
              className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition-all bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full group hover:from-blue-600 hover:to-indigo-700"
            >
              {/* Animated Background */}
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-orange-400 group-hover:-translate-x-0"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-full bg-red-400 group-hover:translate-x-0"></span>

              {/* Button Content */}
              <span className="relative flex items-center gap-2">
                <FaCartPlus size={16} />
                أضف إلى السلة
              </span>
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
