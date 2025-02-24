"use client";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CheckOutProps {
  amout: number;
  productCount: number;
}

function CheckOut({ amout, productCount }: CheckOutProps) {
  const router = useRouter();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 shadow-lg p-2 flex justify-center z-50 rounded-b-3xl w-[75%] mx-auto font-cairo">
      <Button
        onClick={() => router.push("/checkout")}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-transform duration-200 ease-out flex items-center justify-between h-12 w-[90%] mx-auto px-4 hover:scale-105"
      >
        {/* Animated Arrow */}
        <AnimatedArrow />

        {/* Checkout Text */}
        <p className="text-sm sm:text-base">اتمام الشراء</p>

        {/* Product Count and Total Amount */}
        <div className="flex items-start flex-col text-[12px]">
          <span>{productCount} عنصر</span>
          <span>{amout.toFixed(2)} ر.س</span>
        </div>
      </Button>
    </div>
  );
}

export default CheckOut;

const AnimatedArrow = () => {
  return (
    <motion.span
      className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded px-2 flex items-center justify-center font-extrabold"
      animate={{
        x: [0, 10, 0], // Slightly larger movement for more noticeable loop
      }}
      transition={{
        x: {
          repeat: Infinity, // Loop indefinitely
          repeatType: "reverse", // Reverse the animation
          duration: 2, // Slower movement for smoother transition
          ease: "easeInOut", // Smooth easing
        },
      }}
    >
      &#8594;
    </motion.span>
  );
};
