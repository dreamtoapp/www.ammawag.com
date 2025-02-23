// components/LoadingSkeleton.tsx
import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl shadow-md overflow-hidden relative bg-white border-gray-200 animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="w-full h-40 bg-gray-300 rounded-t-2xl"></div>

          {/* Content Placeholder */}
          <div className="space-y-2 p-4 text-center">
            {/* Product Name Placeholder */}
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>

            {/* Price Placeholder */}
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mt-2"></div>

            {/* Quantity Buttons Placeholder */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>

            {/* Total Price Placeholder */}
            <div className="mt-2 bg-gray-100 p-2 rounded-lg shadow-sm">
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>

          {/* Add to Cart Button Placeholder */}
          <div className="p-4 flex justify-center items-center">
            <div className="w-24 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
