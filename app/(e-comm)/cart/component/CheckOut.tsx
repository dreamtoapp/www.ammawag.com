"use client";
import { MotionConfig } from "framer-motion";
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
    <div className="bg-white   shadow-lg p-2 flex justify-center z-50 rounded-b-3xl w-[75%] mx-auto font-cairo">
      <Button
        onClick={() => router.push("/checkout")}
        className=" bg-blue-600 text-white hover:bg-blue-700 transition-transform duration-200 ease-out  flex items-center justify-between h-12 w-[90%] mx-auto px-4"
      >
        <AnimatedArrow />

        <p>اتمام الشراء</p>
        <div className="flex items-start  flex-col text-[12px] ">
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
      className=" bg-white text-blue-600 rounded px-2 flex items-center justify-center font-extrabold"
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
