import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { motion } from "framer-motion"; // For animations
import Image from "next/image";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }} // Add hover animation
          whileTap={{ scale: 0.9 }} // Add tap animation
          aria-label="فتح القائمة الجانبية"
          className="p-2 rounded-lg md:hidden hover:bg-primary/10 transition-all"
        >
          <Menu size={24} className="text-primary" />
        </motion.button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72 bg-background/95 backdrop-blur-md p-6 border-r border-border flex flex-col   items-center"
      >
        {/* Logo at the Top */}
        <div className="w-full mb-6">
          <Link href="/" aria-label="الصفحة الرئيسية">
            <motion.div
              whileHover={{ scale: 1.05 }} // Add hover animation
              whileTap={{ scale: 0.95 }} // Add tap animation
              className="  relative mt-4  bg-blue-600 w-full p-4 flex justify-center items-center border-b rounded-lg overflow-hidden h-[100px] "
            >
              <Image
                src="/assets/logo.png"
                alt="امواج للمياة الصحية"
                fill
                priority
                className="w-full h-full object-contain"
              />
            </motion.div>
          </Link>
        </div>

        {/* العنوان */}

        {/* الروابط العمودية */}
        <div className="flex flex-col gap-6 mt-4 w-full">
          <SheetTitle className="text-xl font-bold mb-6 text-primary">
            يسعدنا خدمتكم
          </SheetTitle>
          {/* Navigation Links */}
          <NavLinks />
        </div>
      </SheetContent>
    </Sheet>
  );
}
